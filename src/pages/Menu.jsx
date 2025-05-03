import { useParams, Link } from 'react-router';
import MakiSushi from '../pages/ProductMaki';
import NigiriSushi from './ProductNigiri';
import Sashimi from './ProductSashimi';
import Drinks from './ProductDrinks';
import { useCartStore } from '../data/CartStore.js';

const Menu = () => {
  const { menuId } = useParams();

  return (
    <div className="menu">
      <MakiSushi />
      <NigiriSushi />
      <Sashimi />
      <Drinks />
    </div>
  );
};

export default Menu;