import { FC } from 'react'
import ShoppingListForm from './components/ShoppingListForm'
import ShoppingList from './components/ShoppingList'

const App: FC = () => {
  return (
    <>
      <ShoppingListForm />
      <ShoppingList />
    </>
  )
}

export default App
