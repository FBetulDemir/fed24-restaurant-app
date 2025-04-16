import { useParams } from 'react-router'
import MakiSushi from '../pages/ProductMaki'

const Menu = () => {
    const { menuId } = useParams()
    return (
        <div className="menu">
            <MakiSushi />

            { menuId  ? <p>Här kan du se vår sushi och sashimi.</p> : <p>Page not found</p>}
            
        </div>
    )
  }
  
  export default Menu;