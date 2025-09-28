import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Follow } from '@prisma/client';
import { IRepository } from '../../interfaces/repository.interface';

@Injectable()
export class FollowsRepository implements IRepository<Follow> {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: Omit<Follow, 'id' | 'followedAt'>): Promise<Follow> {
    return this.prisma.follow.create({ data: entity });
  }

  async findById(id: number): Promise<Follow | null> {
    return this.prisma.follow.findUnique({ where: { id } });
  }

  async findAll(): Promise<Follow[]> {
    return this.prisma.follow.findMany();
  }

  async update(
    id: number,
    entity: Partial<Omit<Follow, 'id' | 'followedAt'>>,
  ): Promise<Follow> {
    return this.prisma.follow.update({ where: { id }, data: entity });
  }

  async delete(id: number): Promise<Follow> {
    return this.prisma.follow.delete({ where: { id } });
  }

  async findByUserAndCommunity(
    userId: number,
    communityId: number,
  ): Promise<Follow | null> {
    return this.prisma.follow.findUnique({
      where: { userId_communityId: { userId, communityId } },
    });
  }

  async findByUser(userId: number): Promise<Follow[]> {
    return this.prisma.follow.findMany({ where: { userId } });
  }

  async findByCommunity(communityId: number): Promise<Follow[]> {
    return this.prisma.follow.findMany({ where: { communityId } });
  }

  async followCommunity(userId: number, communityId: number): Promise<Follow> {
    return this.prisma.follow.create({ data: { userId, communityId } });
  }

  async isFollowing(userId: number, communityId: number): Promise<boolean> {
    const follow = await this.findByUserAndCommunity(userId, communityId);
    return !!follow;
  }
}
