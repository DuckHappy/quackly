import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CommunitiesModule } from './communities/communities.module';
import { RoleModule } from './role/role.module';
import { MemberModule } from './member/member.module';
import { SummaryBotModule } from './summary-bot/summary-bot.module';
import { FollowsModule } from './follows/follows.module';
import { PostsModule } from './posts/posts.module';
import { CommunitiesModule } from './communities/communities.module';

@Module({
  imports: [DatabaseModule, CommunitiesModule, PostsModule, FollowsModule, SummaryBotModule, MemberModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
