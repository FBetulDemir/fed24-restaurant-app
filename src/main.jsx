import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createHashRouter, RouterProvider } from 'react-router'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Menu from './pages/Menu.jsx'
import receipt from './pages/receipt.jsx'
import InLogg from './pages/InLogg.jsx'
import SushiMenu from './pages/SushiMenu.jsx'
import SashimiMenu from './pages/SashimiMenu.jsx'
import DrinksMenu from './pages/DrinksMenu.jsx'
import Cart from './components/Cart.jsx'
import OrderOnline from './pages/OrderOnline.jsx'
import AdminStart from './components/AdminStart.jsx'
import AdminDishForm from './components/AdminDishForm.jsx'
import ProductDrinks from './pages/ProductDrinks.jsx'
import ProductMaki from './pages/ProductMaki.jsx'
import ProductNigiri from './pages/ProductNigiri.jsx'
import ProductSashimi from './pages/ProductSashimi.jsx'
import FetchReceipt from './components/FetchReceipt.jsx'
import EditMenu from './pages/EditMenu.jsx'
// import { HashRouter } from 'react-router'


const router = createHashRouter(
  [
    {
      path: '/',
      Component: App,
      children: [
        {
          index: true,
          Component: Home
        },
        {
          path: '/pages/:aboutId?',
          Component: About,
        },
        {
          path: '/pages/menu/:menuId?',
          Component: Menu,
        },
        {
        path: '/pages/menu/sushi/:sushiId?',
        // Component: SushiMenu,
        Component: ProductMaki,
        },
        {
        path: '/pages/menu/sushi/:sushiId?',
        // Component: SushiMenu,
        Component: ProductNigiri,
        },
        {
          path: '/pages/menu/sashimi/:sashimiId?',
          // Component: SashimiMenu,
          Component: ProductSashimi,
        },
        {
          path: '/pages/orderOnline/:orderId?',
          Component: OrderOnline,
        },
        {
          path: '/pages/menu/drinks/:drinksId?',
          // Component: DrinksMenu,
          Component: ProductDrinks,
        },
        {
          path: '/pages/receipt/:receiptId?',
          Component: FetchReceipt,
        },
        { 
          path: '/admin/login/:loginId?', 
          Component: InLogg 
        },
        { 
          path: 'components/admin/:adminId?', 
          Component: AdminStart 
        },
        {
          path: '/admin/add',
          Component: AdminDishForm,
        },
        { 
          path: 'components/cart/:cartId?', 
          Component: Cart 
        },
        {
          path: 'components/admin/:adminId?',
          Component: AdminStart,
        },
        {
          path: '/admin/add',
          Component: AdminDishForm,
        },
        {
          path: 'pages/editMenu/:menuId?',
          Component: EditMenu,
        }
        

        
      ]
   }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
