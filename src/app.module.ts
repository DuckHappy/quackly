import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CommunitiesModule } from './communities/communities.module';
import { MemberModule } from './member/member.module';
import { FollowsModule } from './follows/follows.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    CommunitiesModule,
    PostsModule,
    FollowsModule,
    UsersModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
