export interface IShoppingListItem {
  id?: number
  title: string
  description?: string
  amount: number
  unit?: string
  done: boolean
}

export interface LayoutProps {
  children: React.ReactNode
}

export interface ShoppingListItemProps {
  item: IShoppingListItem
}

export interface ModalProps {
  onDelete: () => void
  onClose: () => void
  isOpen: boolean
}

export interface IFormError {
  title?: string
  amount?: string
}
