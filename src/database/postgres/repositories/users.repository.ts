import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { IRepository } from 'src/database/interfaces/repository.interface';

@Injectable()
export class UsersRepository implements IRepository<User> {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    entity: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    return this.prisma.user.create({ data: entity });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async update(
    id: number,
    entity: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: entity });
  }

  async delete(id: number): Promise<User | null> {
    return this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
