import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { CommunitiesRepository } from 'src/database/postgres/repositories/communities.repository';
import { MembersRepository } from '../database/postgres/repositories/members.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CommunitiesController],
  providers: [
    CommunitiesService,
    CommunitiesRepository,
    MembersRepository
  ],
  exports: [CommunitiesService],
})
export class CommunitiesModule {}
