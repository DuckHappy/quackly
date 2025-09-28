// src/database/postgres/repositories/communities.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CommunitiesRepository } from '../../repositories/communities.repository';
import { PrismaService } from '../../prisma.service';
import { Community } from '@prisma/client';

describe('CommunitiesRepository (unit)', () => {
  let repository: CommunitiesRepository;
  let prisma: PrismaService;

  const mockCommunity: Community = {
    id: 1,
    name: 'Test Community',
    description: 'A test community',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
  };

  const mockPrismaService = {
    community: {
      create: jest.fn().mockResolvedValue(mockCommunity),
      findUnique: jest.fn().mockResolvedValue(mockCommunity),
      findMany: jest.fn().mockResolvedValue([mockCommunity]),
      update: jest.fn().mockResolvedValue(mockCommunity),
      delete: jest.fn().mockResolvedValue(mockCommunity),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunitiesRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    repository = module.get<CommunitiesRepository>(CommunitiesRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a community', async () => {
    const result = await repository.create({
      name: 'Test Community',
      description: 'A test community',
      ownerId: 1,
    });
    expect(result).toEqual(mockCommunity);
    expect(prisma.community.create).toHaveBeenCalledWith({
      data: {
        name: 'Test Community',
        description: 'A test community',
        ownerId: 1,
      },
    });
  });

  it('should find a community by id', async () => {
    const result = await repository.findById(1);
    expect(result).toEqual(mockCommunity);
  });

  it('should update a community', async () => {
    const result = await repository.update(1, { name: 'Updated Name' });
    expect(result).toEqual(mockCommunity);
  });

  it('should delete a community', async () => {
    const result = await repository.delete(1);
    expect(result).toEqual(mockCommunity);
  });

  it('should find communities by owner', async () => {
    const result = await repository.findByOwner(1);
    expect(result).toEqual([mockCommunity]);
  });
});
