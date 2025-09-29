import { Injectable } from '@nestjs/common';
import { CommunitiesRepository } from '../database/postgres/repositories/communities.repository';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from '@prisma/client';

@Injectable()
export class CommunitiesService {
  constructor(private communitiesRepository: CommunitiesRepository) {}

  async createCommunity(data: CreateCommunityDto): Promise<Community> {
    return this.communitiesRepository.create(data);
  }

  async findById(id: number): Promise<Community | null> {
    return this.communitiesRepository.findById(id);
  }

  async findAll(): Promise<Community[]> {
    return this.communitiesRepository.findAll();
  }

  async update(
    id: number,
    data: UpdateCommunityDto,
  ): Promise<Community | null> {
    return this.communitiesRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.communitiesRepository.delete(id);
      return !!result;
    } catch (error) {
      return false;
    }
  }
}
