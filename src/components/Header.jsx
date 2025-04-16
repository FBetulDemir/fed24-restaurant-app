import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <Link to="/menu">Menu</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
}