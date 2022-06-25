import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import ShoppingListEdit from './components/ShoppingListEdit'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<App />} />
          <Route path="shoppinglist" element={<ShoppingListEdit />}>
            <Route path=":itemId" element={<ShoppingListEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
