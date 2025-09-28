import { Test, TestingModule } from '@nestjs/testing';
import { MembersRepository } from '../../repositories/members.repository';
import { PrismaService } from '../../prisma.service';
import { Role } from '@prisma/client';

describe('MembersRepository (unit)', () => {
  let repository: MembersRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersRepository,
        {
          provide: PrismaService,
          useValue: {
            member: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<MembersRepository>(MembersRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should add a member', async () => {
    const mockMember = { userId: 1, communityId: 2, role: Role.MEMBER };
    (prisma.member.create as jest.Mock).mockResolvedValue(mockMember);

    const result = await repository.addMember(1, 2);
    expect(prisma.member.create).toHaveBeenCalledWith({
      data: { userId: 1, communityId: 2, role: Role.MEMBER },
    });
    expect(result).toEqual(mockMember);
  });

  it('should find a member', async () => {
    const mockMember = { userId: 1, communityId: 2, role: Role.MEMBER };
    (prisma.member.findUnique as jest.Mock).mockResolvedValue(mockMember);

    const result = await repository.findMember(1, 2);
    expect(prisma.member.findUnique).toHaveBeenCalledWith({
      where: { userId_communityId: { userId: 1, communityId: 2 } },
    });
    expect(result).toEqual(mockMember);
  });

  it('should get members by community', async () => {
    const members = [{ userId: 1, communityId: 2 }];
    (prisma.member.findMany as jest.Mock).mockResolvedValue(members);

    const result = await repository.getMembersByCommunity(2);
    expect(prisma.member.findMany).toHaveBeenCalledWith({
      where: { communityId: 2 },
    });
    expect(result).toEqual(members);
  });

  it('should get communities by user', async () => {
    const memberships = [{ userId: 1, communityId: 2 }];
    (prisma.member.findMany as jest.Mock).mockResolvedValue(memberships);

    const result = await repository.getCommunitiesByUser(1);
    expect(prisma.member.findMany).toHaveBeenCalledWith({
      where: { userId: 1 },
    });
    expect(result).toEqual(memberships);
  });
});
