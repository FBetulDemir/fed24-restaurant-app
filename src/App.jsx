import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { store } from './stores/store';
import Admin from './pages/Admin';

function App() {
  const fetchMenu = store((state) => state.fetchMenu);

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
