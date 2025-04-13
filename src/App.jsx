import { Outlet } from 'react-router'
import './App.css'
import Header from './components/Header'

function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main>
        <Outlet />

      </main>
      <footer>
        <p>&copy; 2025 ISushi. Alla rättigheter förbehållna. Integritetspolicy | Användarvillkor</p>
      </footer>
    </div>
  )
}

export default App
