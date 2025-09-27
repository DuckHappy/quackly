import { Injectable } from '@nestjs/common';
import { CommunitiesRepository } from '../database/postgres/repositories/communities.repository';
import { CreateCommunityDto } from './dto/create-community.dto';
import { promises } from 'dns';

//error with prisma, no dafault place
//import { Community } from './database/postgres/prisma/schema.prisma';

//temporal type (needed: fix prisma)
export type Community = {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
};

@Injectable()
export class CommunitiesService {

  constructor(private communitiesRepository: CommunitiesRepository) { }

  async createCommunity(data: CreateCommunityDto): Promise<Community> {
    return this.communitiesRepository.create(data);
  }

  async findById(id: number): Promise<Community[]> {
    return this.communitiesRepository.findById(id);
  }

  async findAll(): Promise<Community[]> {
    return this.communitiesRepository.findAll;
  }

  async update(id: number, entity: Partial<Community>): Promise<Community | null> {
    return this.communitiesRepository.update(id, entity);
  }

  async delete(id: number): Promise<boolean> {
    const exists = await this.communitiesRepository.findById(id);
    if (!exists) {
      return false;
    }
    return this.communitiesRepository.delete(id);
  }
}
