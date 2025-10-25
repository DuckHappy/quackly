import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunityProfileController } from './community-profile.controller';
import { CommunityProfileService } from './community-profile.service';
import { PostsRepository } from 'src/database/mongodb/repositories/post.repository';
import { CommunitySummaryRepository } from 'src/database/mongodb/repositories/community-summary.repository';
import { OpenAIModule } from 'src/openai/openai.module';
import { Post, PostSchema } from 'src/database/mongodb/schemas/post.schema';
import {
  CommunitySummary,
  CommunitySummarySchema,
} from 'src/database/mongodb/schemas/community-summary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: CommunitySummary.name, schema: CommunitySummarySchema },
    ]),
    OpenAIModule,
  ],
  controllers: [CommunityProfileController],
  providers: [
    CommunityProfileService,
    PostsRepository,
    CommunitySummaryRepository,
  ],
  exports: [CommunityProfileService],
})
export class CommunityProfileModule {}
