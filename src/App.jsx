import './App.css'
import FetchReceipt from './components/FetchReceipt'
import Receipt from './components/receipt'

function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to ISushi</h1>
        
      </header>
      <main>
	  	<Receipt />
		<FetchReceipt />

      </main>
      <footer>
        <p>&copy; 2025 ISushi. Alla rättigheter förbehållna. Integritetspolicy | Användarvillkor</p>
      </footer>
    </div>
  )
}

export default App
