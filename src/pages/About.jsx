import { useParams } from "react-router"


const About = () => {
    const { aboutId } = useParams()
    return(
        <div className="about">
            <h1>Om oss </h1>
            { aboutId ? <p>Vi är en sushi-restaurang som erbjuder autentisk japansk sushi och sashimi.</p> : <p>Page not found</p>}

        </div>
    )
}

export default About