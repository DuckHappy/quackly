import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from '../database/database.module'; 
import { PostsRepository } from '../database/mongodb/repositories/post.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../database/mongodb/schemas/post.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
