// seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Crear usuarios con sus mesas
  const user1 = await prisma.user.create({
    data: {
      email: 'admin@restaurante.com',
      password: '$2b$10$EjXZ5Z5Z5Z5Z5Z5Z5Z5Z.5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z', // contraseña hasheada (ejemplo: "password")
      name: 'Administrador',
      diningTables: {
        create: [
          { name: 'Mesa 1', capacity: 4 },
          { name: 'Mesa 2', capacity: 6 },
          { name: 'Mesa VIP', capacity: 8 },
        ],
      },
    },
    include: {
      diningTables: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'gerente@restaurante.com',
      password: '$2b$10$EjXZ5Z5Z5Z5Z5Z5Z5Z5Z.5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z',
      name: 'Gerente',
      diningTables: {
        create: [
          { name: 'Terraza 1', capacity: 2 },
          { name: 'Terraza 2', capacity: 4 },
        ],
      },
    },
    include: {
      diningTables: true,
    },
  });

  // Crear categorías con productos
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Bebidas',
        products: {
          create: [
            { name: 'Agua Mineral', price: 2.5 },
            { name: 'Refresco', price: 3.0 },
            { name: 'Cerveza', price: 4.5 },
          ],
        },
      },
      include: {
        products: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Entrantes',
        products: {
          create: [
            { name: 'Ensalada César', price: 8.0 },
            { name: 'Pan con Ajo', price: 4.5 },
            { name: 'Patatas Bravas', price: 6.0 },
          ],
        },
      },
      include: {
        products: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Platos Principales',
        products: {
          create: [
            { name: 'Filete de Ternera', price: 18.5 },
            { name: 'Salmón a la Plancha', price: 16.0 },
            { name: 'Pasta Carbonara', price: 12.5 },
          ],
        },
      },
      include: {
        products: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Postres',
        products: {
          create: [
            { name: 'Tarta de Chocolate', price: 6.5 },
            { name: 'Helado', price: 5.0 },
            { name: 'Flan', price: 4.5 },
          ],
        },
      },
      include: {
        products: true,
      },
    }),
  ]);

  console.log('Seed completado con éxito:');
  console.log('Usuarios creados:', { user1, user2 });
  console.log('Categorías y productos creados:', categories);
}

main()
  .catch((e) => {
    console.error('Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });