import { Outlet } from 'react-router'
import './App.css'
<<<<<<< HEAD
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
=======
import MakiSushi from './pages/ProductMaki'
import NigiriSushi from './pages/ProductNigiri'
import Sashimi from './pages/ProductSashimi'
import Dricker from './pages/ProductDrinks'
>>>>>>> product_page

function App() {
  return (
<<<<<<< HEAD
    <div className="layout">
        <Header />
        <main className='main'>
          <Outlet />
        </main>
        <Footer />
=======
    <div className="App">
      <header className="App-header">
        <h1>Welcome to iSushi</h1>
        
      </header>
      <main>
        <MakiSushi />
        <NigiriSushi />
        <Sashimi />
        <Dricker />

      </main>
      <footer>
        <p>&copy; 2025 iSushi. Alla rättigheter förbehållna. Integritetspolicy | Användarvillkor</p>
      </footer>
>>>>>>> product_page
    </div>
  );
}

export default App;
