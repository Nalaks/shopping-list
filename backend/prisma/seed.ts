import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const shoppingListData: Prisma.ShoppingListCreateInput[] = [
  {
    title: 'buy tomatoes',
    description: 'cherry tomatoes',
    amount: 3,
    unit: 'kg',
    done: false,
  },
  {
    title: 'get feta cheese',
    description: 'the one from spar',
    amount: 1,
    unit: 'pieces',
    done: false,
  },
  {
    title: 'check for cherry cola',
    amount: 2,
    unit: 'liter',
    done: false,
  },
]

async function main() {
  console.log(`Start seeding ...`)
  // eslint-disable-next-line no-restricted-syntax
  for (const item of shoppingListData) {
    // eslint-disable-next-line no-await-in-loop
    const shoppingList = await prisma.shoppingList.create({
      data: item,
    })
    console.log(`Created shopping list: ${shoppingList.title}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
