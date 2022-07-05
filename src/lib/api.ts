import { IShoppingListItem } from '../types/types'

const url = 'http://localhost:3001/shoppingList'

const getShoppingListItems = async (): Promise<IShoppingListItem[]> => {
  const response = await fetch(url)
  return response.json()
}

const getShoppingListItem = async (id: number): Promise<any> => {
  const response = await fetch(`${url}/${id}`)
  return response.json()
}

const createShoppingListItem = async (
  shoppingListItem: IShoppingListItem,
): Promise<IShoppingListItem> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shoppingListItem),
  })
  return response.json()
}

const updateShoppingListItem = async (
  shoppingListItem: IShoppingListItem,
): Promise<IShoppingListItem> => {
  const response = await fetch(`${url}/${shoppingListItem.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shoppingListItem),
  })
  return response.json()
}

const deleteShoppingListItem = async (
  id: number,
): Promise<IShoppingListItem> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  })
  return response.json()
}

export {
  getShoppingListItems,
  getShoppingListItem,
  createShoppingListItem,
  updateShoppingListItem,
  deleteShoppingListItem,
}
