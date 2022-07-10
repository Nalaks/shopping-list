import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

const shoppingListItemsController = async (_req: Request, res: Response) => {
  const shoppingListItems = await prisma.shoppingList.findMany()
  res.json(shoppingListItems)
}

const shoppingListItemController = async (req: Request, res: Response) => {
  const { id } = req.params
  const shoppingListItem = await prisma.shoppingList.findUnique({
    where: { id: Number(id) },
  })
  res.json(shoppingListItem)
}

const shoppingListCreateController = async (req: Request, res: Response) => {
  const item = req.body
  const shoppingListItem = await prisma.shoppingList.create({
    data: {
      ...item,
    },
  })
  res.json(shoppingListItem)
}

const shoppingListDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params
  const shoppingListItem = await prisma.shoppingList.delete({
    where: { id: Number(id) },
  })
  res.json(shoppingListItem)
}

const shoppingListUpdateController = async (req: Request, res: Response) => {
  const { id } = req.params
  const item = req.body
  const shoppingListItem = await prisma.shoppingList.update({
    where: { id: Number(id) },
    data: {
      ...item,
    },
  })
  res.json(shoppingListItem)
}

export {
  shoppingListItemsController,
  shoppingListItemController,
  shoppingListCreateController,
  shoppingListDeleteController,
  shoppingListUpdateController,
}
