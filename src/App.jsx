import { Outlet } from 'react-router'
import './App.css'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Receipt from './components/receipt'

function App() {
  

  return (
    <div className="layout">
        <Header />
        <main className='main'>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default App
