// src/database/postgres/repositories/follows.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { FollowsRepository } from '../../repositories/follows.repository';
import { PrismaService } from '../../prisma.service';
import { Follow } from '@prisma/client';

describe('FollowsRepository (unit)', () => {
  let repository: FollowsRepository;
  let prisma: PrismaService;

  const mockFollow: Follow = {
    id: 1,
    userId: 1,
    communityId: 2,
    followedAt: new Date(),
  };

  const mockPrismaService = {
    follow: {
      create: jest.fn().mockResolvedValue(mockFollow),
      findUnique: jest.fn().mockResolvedValue(mockFollow),
      findMany: jest.fn().mockResolvedValue([mockFollow]),
      update: jest.fn().mockResolvedValue(mockFollow),
      delete: jest.fn().mockResolvedValue(mockFollow),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowsRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    repository = module.get<FollowsRepository>(FollowsRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a follow', async () => {
    const result = await repository.create({ userId: 1, communityId: 2 });
    expect(result).toEqual(mockFollow);
    expect(prisma.follow.create).toHaveBeenCalledWith({
      data: { userId: 1, communityId: 2 },
    });
  });

  it('should find a follow by id', async () => {
    const result = await repository.findById(1);
    expect(result).toEqual(mockFollow);
  });

  it('should check if user is following a community', async () => {
    const result = await repository.isFollowing(1, 2);
    expect(result).toBe(true);
  });
});
