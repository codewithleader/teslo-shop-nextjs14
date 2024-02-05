import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {
  // 1. Borrar registros previos
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  // 2.

  console.log('Seed Executed');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(process.env.NODE_ENV);
  main();
})();
