import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';

describe('PrismaService (integration)', () => {
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(prisma).toBeDefined();
  });

  it('should connect to the database', async () => {
    const result = await prisma.$queryRaw`SELECT 1`;
    expect(result).toBeDefined();
  });

  it('should have generated models', () => {
    expect(prisma.user).toBeDefined();
    expect(prisma.community).toBeDefined();
    expect(prisma.member).toBeDefined();
    expect(prisma.follow).toBeDefined();
  });

  it('should allow basic CRUD queries', async () => {
    // Contar registros de cada tabla (no importa si está vacío)
    const userCount = await prisma.user.count();
    const communityCount = await prisma.community.count();
    const memberCount = await prisma.member.count();
    const followCount = await prisma.follow.count();

    expect(typeof userCount).toBe('number');
    expect(typeof communityCount).toBe('number');
    expect(typeof memberCount).toBe('number');
    expect(typeof followCount).toBe('number');
  });

  it('should create and relate entities', async () => {
    // Crear un usuario
    const user = await prisma.user.create({
      data: {
        email: `test_${Date.now()}@example.com`,
        username: `user_${Date.now()}`,
        password: '123456',
      },
    });

    // Crear una comunidad relacionada con el usuario
    const community = await prisma.community.create({
      data: {
        name: 'Test Community',
        description: 'Comunidad de prueba',
        ownerId: user.id,
      },
    });

    // Crear un miembro (usuario ↔ comunidad)
    const member = await prisma.member.create({
      data: {
        userId: user.id,
        communityId: community.id,
      },
    });

    // Crear un follow (usuario ↔ comunidad)
    const follow = await prisma.follow.create({
      data: {
        userId: user.id,
        communityId: community.id,
      },
    });

    expect(user.id).toBeDefined();
    expect(community.id).toBeDefined();
    expect(member.id).toBeDefined();
    expect(follow.id).toBeDefined();
  });
});
