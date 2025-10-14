import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { Follow } from '@prisma/client';
import { FollowsRepository } from 'src/database/postgres/repositories/follows.repository';

@Injectable()
export class FollowsService {
  constructor(private followsRepository: FollowsRepository) {}

  async create(createFollowDto: CreateFollowDto) {
    return this.followsRepository.create(createFollowDto);
  }

  async findAll(): Promise<Follow[]> {
    return this.followsRepository.findAll();
  }

  async findById(id: number) {
    return this.followsRepository.findById(id);
  }

  async update(id: number, updateFollowDto: UpdateFollowDto) {
    return this.followsRepository.update(id, updateFollowDto);
  }

  async delete(id: number) {
    return this.followsRepository.delete(id);
  }
}
