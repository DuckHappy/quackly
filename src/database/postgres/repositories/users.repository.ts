import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { IRepository } from 'src/database/interfaces/repository.interface';

@Injectable()
export class UsersRepository implements IRepository<User, number> {
  constructor(private readonly prisma: PrismaService) {}

  // Implementación genérica de IRepository
  async create(entity: User): Promise<User> {
    return this.prisma.user.create({ data: entity });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async update(id: number, entity: Partial<User>): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data: entity,
    });
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.prisma.user.delete({ where: { id } });
    return !!deleted;
  }

  // Métodos específicos de UsersRepository
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
