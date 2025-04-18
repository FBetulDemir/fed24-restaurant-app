import './App.css'
import MakiSushi from './pages/ProductMaki'
import NigiriSushi from './pages/ProductNigiri'
import Sashimi from './pages/ProductSashimi'
import Dricker from './pages/ProductDrinks'

function App() {
  

  return (
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
    </div>
  )
}

export default App
