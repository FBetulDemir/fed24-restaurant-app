import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import InLogg from './pages/inlogg'

function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to ISushi</h1>
        
      </header>
      <main>
        
        <InLogg />
      </main>
      <footer>
        <p>&copy; 2025 ISushi. Alla rättigheter förbehållna. Integritetspolicy | Användarvillkor</p>
      </footer>
    </div>
  )
}

export default App
