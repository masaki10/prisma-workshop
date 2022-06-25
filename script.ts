import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  // ... you will write your Prisma Client queries here

  // get all
  // const result1 = await prisma.user.findMany();
  // console.log(result1);

  // create
  // const result2 = await prisma.user.create({
  //   data: {
  //     email: "alice@prisma.io",
  //   }
  // });
  // console.log(result2);

  // update
  // const result3 = await prisma.user.update({
  //   where: {
  //     id: 4,
  //   },
  //   data: {
  //     name: "alice",
  //   }
  // });
  // console.log(result3);

  // create
  // const result4 = await prisma.post.create({
  //   data: {
  //     title: "Hello World",
  //   }
  // });
  // console.log(result4);

  // update 
  // const result5 = await prisma.post.update({
  //   where: {
  //     id: 1,
  //   },
  //   data: {
  //     author: {
  //       connect: {
  //         email: "alice@prisma.io",
  //       }
  //     }
  //   },
  // });
  // console.log(result5);

  // findUnique
  // const result6 = await prisma.user.findUnique({
  //   where: {
  //     email: "alice@prisma.io",
  //   }
  // });
  // console.log(result6);

  // findMany select
  // const result7 = await prisma.user.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //   }
  // });
  // console.log(result7[0]);

  // create nest
  // const result8 = await prisma.user.create({
  //   data: {
  //     name: "niko",
  //     email: "niko@prisma.io",
  //     posts: {
  //       create: {
  //         title: "Prisma introduction"
  //       }
  //     }
  //   }
  // });
  // console.log(result8);

  // get including nest
  // const result9 = await prisma.user.findUnique({
  //   where: {id: 4},
  //   include: {posts: true},
  // });
  // console.log(result9);

  // get user whose name start "A"
  // const result10 = await prisma.user.findMany({
  //   where: {name: {startsWith: "A"}},
  // });
  // console.log(result10);

  //
  const result11 = await prisma.user.findMany({
    skip: 2,
    take: 2,
  });
  console.log(result11);
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
