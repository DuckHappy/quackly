import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Community } from '@prisma/client';
import { IRepository } from '../../interfaces/repository.interface';

@Injectable()
export class CommunitiesRepository implements IRepository<Community, number> {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: Community): Promise<Community> {
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
    entity: Partial<Community>,
  ): Promise<Community | null> {
    return this.prisma.community.update({
      where: { id },
      data: entity,
    });
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.prisma.community.delete({ where: { id } });
    return !!deleted;
  }

  async findByOwner(ownerId: number): Promise<Community[]> {
    return this.prisma.community.findMany({ where: { ownerId } });
  }
}
