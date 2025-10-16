import { Test, TestingModule } from '@nestjs/testing';
import { CommunitiesRepository } from '../../repositories/communities.repository';
import { PrismaService } from '../../prisma.service';
import { Community } from '@prisma/client';

describe('CommunitiesRepository (Integration)', () => {
  let repository: CommunitiesRepository;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunitiesRepository, PrismaService],
    }).compile();

    repository = module.get<CommunitiesRepository>(CommunitiesRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    // Limpiar tablas para aislar pruebas
    await prisma.follow.deleteMany();
    await prisma.member.deleteMany();
    await prisma.community.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a community', async () => {
    const user = await prisma.user.create({
      data: { email: 'owner@test.com', username: 'owner', password: '1234' },
    });

    const community = await repository.create({
      name: 'MyCommunity',
      description: 'A great community',
      ownerId: user.id,
    });

    expect(community.id).toBeDefined();
    expect(community.name).toBe('MyCommunity');
    expect(community.ownerId).toBe(user.id);
    expect(community.createdAt).toBeInstanceOf(Date);
  });

  it('should find a community by id', async () => {
    const user = await prisma.user.create({
      data: { email: 'owner2@test.com', username: 'owner2', password: '1234' },
    });

    const created = await repository.create({
      name: 'Community2',
      description: 'Another great community',
      ownerId: user.id,
    });
    const found = await repository.findById(created.id);

    expect(found).not.toBeNull();
    expect(found?.id).toBe(created.id);
  });

  it('should return all communities', async () => {
    const user = await prisma.user.create({
      data: { email: 'owner3@test.com', username: 'owner3', password: '1234' },
    });

    await repository.create({
      name: 'C1',
      ownerId: user.id,
      description: 'Description for C1',
    });
    await repository.create({
      name: 'C2',
      ownerId: user.id,
      description: 'Description for C2',
    });

    const all = await repository.findAll();
    expect(all.length).toBeGreaterThanOrEqual(2);
  });

  it('should update a community', async () => {
    const user = await prisma.user.create({
      data: { email: 'owner4@test.com', username: 'owner4', password: '1234' },
    });

    const community = await repository.create({
      name: 'OldName',
      description: 'Old description',
      ownerId: user.id,
    });
    const updated = await repository.update(community.id, {
      name: 'NewName',
      description: 'New description',
    });

    if (!updated) throw new Error('Update failed, community not found');

    expect(updated).not.toBeNull();
    expect(updated.name).toBe('NewName');
    expect(updated.description).toBe('New description');
  });

  it('should delete a community', async () => {
    const user = await prisma.user.create({
      data: { email: 'owner5@test.com', username: 'owner5', password: '1234' },
    });

    const community = await repository.create({
      name: 'ToDelete',
      description: 'This community will be deleted',
      ownerId: user.id,
    });
    const deleted = await repository.delete(community.id);

    expect(deleted.id).toBe(community.id);

    const found = await repository.findById(community.id);
    expect(found).toBeNull();
  });

  it('should find communities by owner', async () => {
    const user = await prisma.user.create({
      data: { email: 'owner6@test.com', username: 'owner6', password: '1234' },
    });

    await repository.create({
      name: 'C1',
      ownerId: user.id,
      description: 'Description for C1',
    });
    await repository.create({
      name: 'C2',
      ownerId: user.id,
      description: 'Description for C2',
    });

    const communities = await repository.findByOwner(user.id);
    expect(communities.length).toBe(2);
  });
});
