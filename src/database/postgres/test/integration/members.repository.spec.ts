import { Test, TestingModule } from '@nestjs/testing';
import { MembersRepository } from '../../repositories/members.repository';
import { PrismaService } from '../../prisma.service';
import { Role } from '@prisma/client';

describe('MembersRepository (Integration)', () => {
  let repository: MembersRepository;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersRepository, PrismaService],
    }).compile();

    repository = module.get<MembersRepository>(MembersRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    // Limpiar tablas antes de cada test
    await prisma.follow.deleteMany();
    await prisma.member.deleteMany();
    await prisma.community.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a member', async () => {
    const user = await prisma.user.create({
      data: { email: 'u1@test.com', username: 'tester1', password: '1234' },
    });
    const community = await prisma.community.create({
      data: { name: 'C1', ownerId: user.id },
    });

    const member = await repository.addMember(user.id, community.id);

    expect(member.id).toBeDefined();
    expect(member.role).toBe(Role.MEMBER);
  });

  it('should find a member by userId and communityId', async () => {
    const user = await prisma.user.create({
      data: { email: 'u2@test.com', username: 'tester2', password: '1234' },
    });
    const community = await prisma.community.create({
      data: { name: 'C2', ownerId: user.id },
    });

    await repository.addMember(user.id, community.id, Role.MODERATOR);
    const found = await repository.findMember(user.id, community.id);

    expect(found).not.toBeNull();
    expect(found?.role).toBe(Role.MODERATOR);
  });

  it('should get all members of a community', async () => {
    const user1 = await prisma.user.create({
      data: { email: 'u3@test.com', username: 'tester3', password: '1234' },
    });
    const user2 = await prisma.user.create({
      data: { email: 'u4@test.com', username: 'tester4', password: '1234' },
    });
    const community = await prisma.community.create({
      data: { name: 'C3', ownerId: user1.id },
    });

    await repository.addMember(user1.id, community.id);
    await repository.addMember(user2.id, community.id);

    const members = await repository.getMembersByCommunity(community.id);
    expect(members.length).toBe(2);
  });

  it('should get all communities of a user', async () => {
    const user = await prisma.user.create({
      data: { email: 'u5@test.com', username: 'tester5', password: '1234' },
    });
    const community1 = await prisma.community.create({
      data: { name: 'C4', ownerId: user.id },
    });
    const community2 = await prisma.community.create({
      data: { name: 'C5', ownerId: user.id },
    });

    await repository.addMember(user.id, community1.id);
    await repository.addMember(user.id, community2.id);

    const communities = await repository.getCommunitiesByUser(user.id);
    expect(communities.length).toBe(2);
  });
});
