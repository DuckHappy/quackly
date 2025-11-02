import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';

import { Request, Response } from 'express';
import { AppLogger } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const { method, url } = req;
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        // Peticiones exitosas
        const duration = Date.now() - start;
        const status = res.statusCode;
        this.logger.log(`${method} ${url} - ${status} - ${duration}ms`);
      }),
      catchError((error) => {
        // Peticiones con error
        const duration = Date.now() - start;
        const status = error?.status || 500;
        this.logger.error(
          `${method} ${url} - ${status} - ${duration}ms`,
          error.stack,
        );
        return throwError(() => error); // deja que el filtro global maneje el error
      }),
    );
  }
}
