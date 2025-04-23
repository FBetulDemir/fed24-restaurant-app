import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="admin-header">
      <nav>
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="logo" />
        </Link>
        <Link to="/menu">Menu</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
}