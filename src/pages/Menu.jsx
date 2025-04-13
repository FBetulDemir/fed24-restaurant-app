import { useParams } from 'react-router'

const Menu = () => {
    const { menuId } = useParams()
    return (
        <div className="menu">
            <h1>Vår meny </h1>
            <h2>Sushi</h2>
                <ul>
                    <li>Lax Nigiri</li>
                    <li>Spicy Tuna Maki</li>
                    <li>Avokado Maki</li>
                </ul>

            <h2>Sashimi</h2>
                <ul>
                    <li>Lax Sashimi</li>
                    <li>Tonfisk Sashimi</li>
                </ul>
            { menuId  ? <p>Här kan du se vår sushi och sashimi.</p> : <p>Page not found</p>}

        </div>
    )
  }
  
  export default Menu;