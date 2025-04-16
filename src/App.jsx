import "./App.css";
import Cart from "./pages/components/Cart";

function App() {
  return (
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
    </div>
  );
}

export default App;
