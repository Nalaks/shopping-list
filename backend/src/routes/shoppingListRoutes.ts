import express from 'express'
import {
  shoppingListItemsController,
  shoppingListItemController,
  shoppingListCreateController,
  shoppingListDeleteController,
  shoppingListUpdateController,
} from '../controllers/shoppingListController'

const router = express.Router()

router.get('/', shoppingListItemsController)

router.get('/:id', shoppingListItemController)

router.post('/', shoppingListCreateController)

router.delete('/:id', shoppingListDeleteController)

router.put('/:id', shoppingListUpdateController)

export default router
