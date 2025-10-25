import { LoggerService } from '@nestjs/common';
import chalk from 'chalk';

export class AppLogger implements LoggerService {
  log(message: string) {
    console.log(this.formatMessage('LOG', message, chalk.white));
  }

  error(message: string, trace?: string) {
    console.error(this.formatMessage('ERROR', message, chalk.red));
    if (trace) console.error(chalk.red(trace));
  }

  warn(message: string) {
    console.warn(this.formatMessage('WARN', message, chalk.yellow));
  }

  debug?(message: string) {
    console.debug(this.formatMessage('DEBUG', message, chalk.cyan));
  }

  verbose?(message: string) {
    console.info(this.formatMessage('VERBOSE', message, chalk.magenta));
  }

  private formatMessage(
    type: string,
    message: string,
    color: (text: string) => string,
  ): string {
    const now = new Date();
    const time = chalk.gray(
      now.toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
    );
    return `[${time}] ${color(`[${type}]`)} ${message}`;
  }
}