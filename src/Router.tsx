import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Layout from './components/Layout'
import ShoppingList from './components/ShoppingList'
import ShoppingListEdit from './components/ShoppingListEdit'

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<App />} />
          </Route>
          <Route path="shopping-list" element={<ShoppingList />} />
          <Route path="shopping-list/:itemId" element={<ShoppingListEdit />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
