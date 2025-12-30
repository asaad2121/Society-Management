const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const email = 'testuser@example.com';
  console.log('Checking for user with email:', email);
  const user = await prisma.user.findUnique({ where: { email } });
  console.log('Result:', user);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
