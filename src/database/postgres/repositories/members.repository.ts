import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Member, Role } from '@prisma/client';
import { IRepository } from '../../interfaces/repository.interface';

@Injectable()
export class MembersRepository
  implements IRepository<Member, { userId: number; communityId: number }>
{
  constructor(private readonly prisma: PrismaService) {}

  // Implementación genérica de IRepository
  async create(entity: Member): Promise<Member> {
    return this.prisma.member.create({ data: entity });
  }

  async findById(id: {
    userId: number;
    communityId: number;
  }): Promise<Member | null> {
    return this.prisma.member.findUnique({
      where: {
        userId_communityId: { userId: id.userId, communityId: id.communityId },
      },
    });
  }

  async findAll(): Promise<Member[]> {
    return this.prisma.member.findMany();
  }

  async update(
    id: { userId: number; communityId: number },
    entity: Partial<Member>,
  ): Promise<Member | null> {
    return this.prisma.member.update({
      where: {
        userId_communityId: { userId: id.userId, communityId: id.communityId },
      },
      data: entity,
    });
  }

  async delete(id: { userId: number; communityId: number }): Promise<boolean> {
    const deleted = await this.prisma.member.delete({
      where: {
        userId_communityId: { userId: id.userId, communityId: id.communityId },
      },
    });
    return !!deleted;
  }

  // Métodos específicos
  async addMember(
    userId: number,
    communityId: number,
    role: Role = Role.MEMBER,
  ): Promise<Member> {
    return this.prisma.member.create({
      data: { userId, communityId, role },
    });
  }

  async findMember(
    userId: number,
    communityId: number,
  ): Promise<Member | null> {
    return this.prisma.member.findUnique({
      where: { userId_communityId: { userId, communityId } },
    });
  }

  async getMembersByCommunity(communityId: number): Promise<Member[]> {
    return this.prisma.member.findMany({ where: { communityId } });
  }

  async getCommunitiesByUser(userId: number): Promise<Member[]> {
    return this.prisma.member.findMany({ where: { userId } });
  }
}
