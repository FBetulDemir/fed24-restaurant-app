const About = () => {
    const { aboutId } = useParams()
    return(
        <div className="about">
            <h1>Om oss { aboutId }</h1>
            <p>Vi är en sushi-restaurang som erbjuder autentisk japansk sushi och sashimi.</p>

        </div>
    )
}

export default About