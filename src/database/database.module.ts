import { Module } from '@nestjs/common';
import { PostgresModule } from './postgres/postgres.module';
import { MongoDBModule } from './mongodb/mongodb.module';

@Module({
  imports: [PostgresModule, MongoDBModule],
  exports: [PostgresModule, MongoDBModule],
})
export class DatabaseModule {}
