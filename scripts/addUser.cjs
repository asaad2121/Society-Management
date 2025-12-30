const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.create({
        data: {
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'USER',
            wing: 'A',
            houseNumber: '101',
            societyNumber: 'S01',
        },
    });

    console.log('Created user:', newUser);
}

main()
    .catch((e) => {
        console.error(e);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
