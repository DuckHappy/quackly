import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Member, Role } from '@prisma/client';
import { IRepository } from '../../interfaces/repository.interface';

@Injectable()
export class MembersRepository implements IRepository<Member> {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: Omit<Member, 'id' | 'joinedAt'>): Promise<Member> {
    return this.prisma.member.create({ data: entity });
  }

  async findById(id: number): Promise<Member | null> {
    return this.prisma.member.findUnique({ where: { id } });
  }

  async findAll(): Promise<Member[]> {
    return this.prisma.member.findMany();
  }

  async update(
    id: number,
    entity: Partial<Omit<Member, 'id' | 'joinedAt'>>,
  ): Promise<Member> {
    return this.prisma.member.update({ where: { id }, data: entity });
  }

  async delete(id: number): Promise<Member> {
    return this.prisma.member.delete({ where: { id } });
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

  async addMember(
    userId: number,
    communityId: number,
    role: Role = Role.MEMBER,
  ): Promise<Member> {
    return this.prisma.member.create({
      data: { userId, communityId, role },
    });
  }
}
