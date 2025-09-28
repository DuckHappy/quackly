// src/database/postgres/test/users.repository.integration.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../../repositories/users.repository';
import { PrismaService } from '../../prisma.service';
import { User } from '@prisma/client';

describe('UsersRepository (integration)', () => {
  let repo: UsersRepository;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepository, PrismaService],
    }).compile();

    repo = module.get<UsersRepository>(UsersRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    // Limpiar tablas para aislar pruebas
    await prisma.follow.deleteMany(); // Tabla dependiente de Community
    await prisma.member.deleteMany(); // Tabla dependiente de Community y User
    await prisma.community.deleteMany(); // Tabla "padre"
    await prisma.user.deleteMany(); // Tabla "padre"
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Factory helper
  const userFactory = (overrides?: Partial<User>) => ({
    email: `user_${Date.now()}@example.com`,
    username: `user_${Date.now()}`,
    password: 'secure123',
    ...overrides,
  });

  it('should create a user', async () => {
    const data = userFactory();
    const user = await repo.create(data);

    expect(user.id).toBeDefined();
    expect(user.email).toBe(data.email);
    expect(user.username).toBe(data.username);
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('should find a user by id', async () => {
    const created = await repo.create(userFactory());
    const found = await repo.findById(created.id);

    expect(found).not.toBeNull();
    expect(found?.id).toBe(created.id);
  });

  it('should return null if user is not found', async () => {
    const found = await repo.findById(99999);
    expect(found).toBeNull();
  });

  it('should update a user', async () => {
    const created = await repo.create(userFactory());
    const updated = await repo.update(created.id, { username: 'updatedUser' });

    expect(updated.username).toBe('updatedUser');
    expect(updated.updatedAt).toBeInstanceOf(Date);
  });

  it('should delete a user', async () => {
    const created = await repo.create(userFactory());
    const deleted = (await repo.delete(created.id)) as User;

    expect(deleted.id).toBe(created.id);

    const found = await repo.findById(created.id);
    expect(found).toBeNull();
  });

  it('should find user by email', async () => {
    const created = await repo.create(userFactory());
    const found = await repo.findByEmail(created.email);

    expect(found).not.toBeNull();
    expect(found?.email).toBe(created.email);
  });

  it('should find user by username', async () => {
    const created = await repo.create(userFactory());
    const found = await repo.findByUsername(created.username);

    expect(found).not.toBeNull();
    expect(found?.username).toBe(created.username);
  });

  it('should return all users', async () => {
    await repo.create(userFactory());
    await repo.create(userFactory());

    const all = await repo.findAll();
    expect(all.length).toBeGreaterThanOrEqual(2);
  });

  it('should throw error when creating duplicate email', async () => {
    const data = userFactory({ email: 'dup@example.com' });
    await repo.create(data);

    await expect(repo.create(data)).rejects.toThrow();
  });
});
