import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { PostgresModule } from '../database/postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
