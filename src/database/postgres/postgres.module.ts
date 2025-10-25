import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { CommunitiesRepository } from './repositories/communities.repository';
import { MembersRepository } from './repositories/members.repository';
import { FollowsRepository } from './repositories/follows.repository';
import { AppLogger } from 'src/utils/app.logger';

@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CommunitiesRepository,
    MembersRepository,
    FollowsRepository,
    AppLogger,
    {
      provide: 'LoggerService',
      useExisting: AppLogger, // cualquier inyección de LoggerService recibe AppLogger
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    CommunitiesRepository,
    MembersRepository,
    FollowsRepository,
    AppLogger,
  ],
})
export class PostgresModule {}
