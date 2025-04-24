import { useParams } from 'react-router'
import MakiSushi from '../pages/ProductMaki'
import NigiriSushi from './ProductNigiri';
import Sashimi from './ProductSashimi';
import Drinks from './ProductDrinks';
import {makiMenuList, nigiriMenuList, sashimiMenuList, drinksMenuList, sushiMenu} from '../data/produktLists';
import SashimiMenu from './SashimiMenu';
import SushiMenu from './SushiMenu';
import DrinksMenu from './DrinksMenu';
  

const Menu = () => {
    const { menuId } = useParams()
    return (
        <div className="menu">
            {/* <SushiMenu />
            <SashimiMenu />
            <DrinksMenu /> */}
            <MakiSushi />
            <NigiriSushi />
            <Sashimi />
            <Drinks />
        </div>
    )
  }
  
  export default Menu;