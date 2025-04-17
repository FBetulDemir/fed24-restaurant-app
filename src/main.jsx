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
          path: '/pages/orderOnline/:orderId?',
          Component: Menu,
        },
        {
          path: '/pages/receipt/:receiptId?',
          Component: receipt,
        },
        { 
          path: 'pages/login/:loginId?', 
          Component: InLogg 
        },
        
      ]
   }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
