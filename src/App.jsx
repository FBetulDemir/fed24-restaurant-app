import { Outlet } from 'react-router';
import './App.css';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { MenuProvider } from './components/MenuContext';

function App() {
  return (
    <MenuProvider> 
      <div className="layout">
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </MenuProvider>
  );
}

export default App;