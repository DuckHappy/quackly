import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Follow } from '@prisma/client';
import { IRepository } from '../../interfaces/repository.interface';

@Injectable()
export class FollowsRepository
  implements IRepository<Follow, { userId: number; communityId: number }>
{
  constructor(private readonly prisma: PrismaService) {}

  // Implementación genérica de IRepository
  async create(entity: Follow): Promise<Follow> {
    return this.prisma.follow.create({ data: entity });
  }

  async findById(id: {
    userId: number;
    communityId: number;
  }): Promise<Follow | null> {
    return this.prisma.follow.findUnique({
      where: {
        userId_communityId: { userId: id.userId, communityId: id.communityId },
      },
    });
  }

  async findAll(): Promise<Follow[]> {
    return this.prisma.follow.findMany();
  }

  async update(
    id: { userId: number; communityId: number },
    entity: Partial<Follow>,
  ): Promise<Follow | null> {
    return this.prisma.follow.update({
      where: {
        userId_communityId: { userId: id.userId, communityId: id.communityId },
      },
      data: entity,
    });
  }

  async delete(id: { userId: number; communityId: number }): Promise<boolean> {
    const deleted = await this.prisma.follow.delete({
      where: {
        userId_communityId: { userId: id.userId, communityId: id.communityId },
      },
    });
    return !!deleted;
  }

  // Métodos específicos
  async followCommunity(userId: number, communityId: number): Promise<Follow> {
    return this.prisma.follow.create({
      data: { userId, communityId },
    });
  }

  async isFollowing(userId: number, communityId: number): Promise<boolean> {
    const follow = await this.prisma.follow.findUnique({
      where: { userId_communityId: { userId, communityId } },
    });
    return !!follow;
  }

  async getFollowsByUser(userId: number): Promise<Follow[]> {
    return this.prisma.follow.findMany({ where: { userId } });
  }
}
