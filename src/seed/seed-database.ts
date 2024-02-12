import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {
  // 1. Borrar registros previos
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  // Para evitar el error "code: 'P2003'" no se puede usar el Promise.all()
  // await Promise.all([
  //   prisma.productImage.deleteMany(),
  //   prisma.product.deleteMany(),
  //   prisma.category.deleteMany(),
  // ]);

  const { categories, products, users } = initialData;

  // 2. Insertar seed data
  // Insert Users
  await prisma.user.createMany({
    data: users,
  });
  // 2.1 Categories
  const categoriesData = categories.map((name) => ({ name }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  // 2.2 Products
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name.toLowerCase()] = category.id; // { shirt: 61bJkdn-askwlen2hdh2-3j3jkf }

      return map;
    },
    {} as Record<string, string>,
  ); // <string=shirt, string=categoryId>

  // console.log(categoriesMap); // { shirts: 'a655dfb1-163b-40e8-80c6-4bc21942a4a4', pants: '517cad1b-4152-47ac-8fe8-3c834a706a95', hoodies: '2b7f5b40-5f9d-40f8-8abb-1866de70d72f', hats: '8f39aa19-cae5-4d35-b02c-65e5a71fd2e7' }

  // const { images, type, ...product1 } = products[0];

  // await prisma.product.create({
  //   data: {
  //     ...product1,
  //     categoryId: categoriesMap[type],
  //   }
  // })

  products.forEach(async (product) => {
    const { images, type, ...productToSave } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...productToSave,
        categoryId: categoriesMap[type],
      },
    });

    // todo: images
    const imagesData = images.map((url) => ({
      url,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log('Seed Executed');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(process.env.NODE_ENV); // TODO: undefined: hay que ver como hacer que funcione
  main();
})();
