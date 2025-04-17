<<<<<<< HEAD
import { Outlet } from 'react-router'
import './App.css'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
=======
import "./App.css";
import Cart from "./components/Cart";
>>>>>>> origin/Order-food

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
        <h1>Welcome to ISushi</h1>
      </header>
      <main>
        <Cart />
      </main>
      <footer>
        <p>
          &copy; 2025 ISushi. Alla rättigheter förbehållna. Integritetspolicy |
          Användarvillkor
        </p>
      </footer>
>>>>>>> origin/Order-food
    </div>
  );
}

export default App;
