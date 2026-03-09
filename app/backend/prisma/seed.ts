import { PrismaClient, ManualStatisticType, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Seeding database...');

  // ---- ADMIN USER ----
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@example.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        role: Role.ADMIN,
        credentials: {
          create: {
            password: {
              create: { passwordHash: hashedPassword },
            },
          },
        },
      },
    });
    console.log('Created admin user with credentials');
  } else {
    console.log('Admin user already exists');
  }

  // ---- ADMIN2 USER ----
  const admin2Email = process.env.SEED_ADMIN2_EMAIL;
  const admin2Password = process.env.SEED_ADMIN2_PASSWORD;

  if (admin2Email && admin2Password) {
    const existingAdmin2 = await prisma.user.findUnique({
      where: { email: admin2Email },
    });

    if (!existingAdmin2) {
      const hashedPassword = await bcrypt.hash(admin2Password, 10);
      await prisma.user.create({
        data: {
          email: admin2Email,
          role: Role.ADMIN,
          credentials: {
            create: {
              password: {
                create: { passwordHash: hashedPassword },
              },
            },
          },
        },
      });
      console.log('Created admin2 user with credentials');
    } else {
      console.log('Admin2 user already exists');
    }
  }

  // ---- ADMIN3 USER ----
  const admin3Email = process.env.SEED_ADMIN3_EMAIL;
  const admin3Password = process.env.SEED_ADMIN3_PASSWORD;

  if (admin3Email && admin3Password) {
    const existingAdmin3 = await prisma.user.findUnique({
      where: { email: admin3Email },
    });

    if (!existingAdmin3) {
      const hashedPassword = await bcrypt.hash(admin3Password, 10);
      await prisma.user.create({
        data: {
          email: admin3Email,
          role: Role.ADMIN,
          credentials: {
            create: {
              password: {
                create: { passwordHash: hashedPassword },
              },
            },
          },
        },
      });
      console.log('Created admin3 user with credentials');
    } else {
      console.log('Admin3 user already exists');
    }
  }

  // ---- MANUAL STATISTICS ----
  console.log('Seeding manual statistics...');

  const types: ManualStatisticType[] = [
    ManualStatisticType.BENEFICIARIES,
    ManualStatisticType.CLOTHES_KG,
    ManualStatisticType.WORKSHOPS,
  ];

  for (const type of types) {
    const existing = await prisma.manualStatistic.findUnique({
      where: { type },
    });

    if (!existing) {
      await prisma.manualStatistic.create({
        data: {
          type,
          totalQuantity: 0,
        },
      });
      console.log(`Created manual statistic: ${type}`);
    } else {
      console.log(` Manual statistic already exists: ${type}`);
    }
  }

  console.log('Seeding completed.');
}

// ---- EXECUTION ----
main()
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('Error during seeding:', err.message);
    } else {
      console.error('Unknown error during seeding:', err);
    }
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
