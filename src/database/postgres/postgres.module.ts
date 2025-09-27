import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { CommunitiesRepository } from './repositories/communities.repository';
import { MembersRepository } from './repositories/members.repository';
import { FollowsRepository } from './repositories/follows.repository';

@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CommunitiesRepository,
    MembersRepository,
    FollowsRepository,
  ],
  exports: [
    UsersRepository,
    CommunitiesRepository,
    MembersRepository,
    FollowsRepository,
  ],
})
export class PostgresModule {}
