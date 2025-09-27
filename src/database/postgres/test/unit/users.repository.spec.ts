import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../../repositories/users.repository';
import { PrismaService } from '../../prisma.service';
import { User } from '@prisma/client';

describe('UsersRepository (unit)', () => {
  let repo: UsersRepository;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    repo = module.get<UsersRepository>(UsersRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const fakeUser: User = {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
    password: 'secure123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should create a user', async () => {
    mockPrismaService.user.create.mockResolvedValue(fakeUser);

    const result = await repo.create({
      email: fakeUser.email,
      username: fakeUser.username,
      password: fakeUser.password,
    });

    expect(result).toEqual(fakeUser);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: fakeUser.email,
        username: fakeUser.username,
        password: fakeUser.password,
      },
    });
  });

  it('should find a user by id', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue(fakeUser);

    const result = await repo.findById(fakeUser.id);
    expect(result).toEqual(fakeUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: fakeUser.id },
    });
  });

  it('should return null if user not found', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue(null);

    const result = await repo.findById(999);
    expect(result).toBeNull();
  });

  it('should update a user', async () => {
    const updatedUser = { ...fakeUser, username: 'updatedUser' };
    mockPrismaService.user.update.mockResolvedValue(updatedUser);

    const result = await repo.update(fakeUser.id, { username: 'updatedUser' });
    expect(result).toEqual(updatedUser);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: fakeUser.id },
      data: { username: 'updatedUser' },
    });
  });

  it('should delete a user', async () => {
    mockPrismaService.user.delete.mockResolvedValue(fakeUser);

    const result = await repo.delete(fakeUser.id);
    expect(result).toEqual(fakeUser);
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: fakeUser.id },
    });
  });
});
