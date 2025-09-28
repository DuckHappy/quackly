import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Community } from '@prisma/client';
import { IRepository } from '../../interfaces/repository.interface';

@Injectable()
export class CommunitiesRepository implements IRepository<Community> {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    entity: Omit<Community, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Community> {
    return this.prisma.community.create({ data: entity });
  }

  async findById(id: number): Promise<Community | null> {
    return this.prisma.community.findUnique({ where: { id } });
  }

  async findAll(): Promise<Community[]> {
    return this.prisma.community.findMany();
  }

  async update(
    id: number,
    entity: Partial<Omit<Community, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Community | null> {
    return this.prisma.community.update({
      where: { id },
      data: entity,
    });
  }

  async delete(id: number): Promise<Community> {
    return await this.prisma.community.delete({ where: { id } });
  }

  async findByOwner(ownerId: number): Promise<Community[]> {
    return this.prisma.community.findMany({ where: { ownerId } });
  }
}
