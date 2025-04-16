import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useMenuStore } from './stores/menuStore';
import Admin from './pages/Admin';

function App() {
  const fetchMenu = useMenuStore((state) => state.fetchMenu);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/menu" element={<div>Menu Page</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
