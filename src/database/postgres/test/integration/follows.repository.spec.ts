import { Test, TestingModule } from '@nestjs/testing';
import { FollowsRepository } from '../../repositories/follows.repository';
import { PrismaService } from '../../prisma.service';

describe('FollowsRepository (Integration)', () => {
  let repository: FollowsRepository;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowsRepository, PrismaService],
    }).compile();

    repository = module.get<FollowsRepository>(FollowsRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    // Limpiar tablas dependientes
    await prisma.follow.deleteMany();
    await prisma.member.deleteMany();
    await prisma.community.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should follow a community', async () => {
    const user = await prisma.user.create({
      data: { email: 'user1@test.com', username: 'user1', password: '1234' },
    });
    const community = await prisma.community.create({
      data: { name: 'Community1', ownerId: user.id },
    });

    const follow = await repository.followCommunity(user.id, community.id);

    expect(follow.id).toBeDefined();
    expect(follow.userId).toBe(user.id);
    expect(follow.communityId).toBe(community.id);

    const isFollowing = await repository.isFollowing(user.id, community.id);
    expect(isFollowing).toBe(true);
  });

  it('should find a follow by user and community', async () => {
    const user = await prisma.user.create({
      data: { email: 'user2@test.com', username: 'user2', password: '1234' },
    });
    const community = await prisma.community.create({
      data: { name: 'Community2', ownerId: user.id },
    });

    await repository.followCommunity(user.id, community.id);
    const follow = await repository.findByUserAndCommunity(
      user.id,
      community.id,
    );

    expect(follow).not.toBeNull();
    expect(follow?.userId).toBe(user.id);
  });

  it('should return all follows for a user', async () => {
    const user = await prisma.user.create({
      data: { email: 'user3@test.com', username: 'user3', password: '1234' },
    });
    const community1 = await prisma.community.create({
      data: { name: 'C1', ownerId: user.id },
    });
    const community2 = await prisma.community.create({
      data: { name: 'C2', ownerId: user.id },
    });

    await repository.followCommunity(user.id, community1.id);
    await repository.followCommunity(user.id, community2.id);

    const follows = await repository.findByUser(user.id);
    expect(follows.length).toBe(2);
  });

  it('should return all follows for a community', async () => {
    const user1 = await prisma.user.create({
      data: { email: 'u1@test.com', username: 'u1', password: '1234' },
    });
    const user2 = await prisma.user.create({
      data: { email: 'u2@test.com', username: 'u2', password: '1234' },
    });
    const community = await prisma.community.create({
      data: { name: 'Community3', ownerId: user1.id },
    });

    await repository.followCommunity(user1.id, community.id);
    await repository.followCommunity(user2.id, community.id);

    const follows = await repository.findByCommunity(community.id);
    expect(follows.length).toBe(2);
  });

  it('should check if user is following a community', async () => {
    const user = await prisma.user.create({
      data: { email: 'user4@test.com', username: 'user4', password: '1234' },
    });
    const community = await prisma.community.create({
      data: { name: 'Community4', ownerId: user.id },
    });

    await repository.followCommunity(user.id, community.id);
    const isFollowing = await repository.isFollowing(user.id, community.id);

    expect(isFollowing).toBe(true);
  });
});
