import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongoDBModule } from 'src/database/mongodb/mongodb.module';

@Module({
  imports: [MongoDBModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
