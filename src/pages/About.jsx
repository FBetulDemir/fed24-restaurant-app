import { useParams } from "react-router"
import AdminDishForm from "../components/AdminDishForm"


const About = () => {
    const { aboutId } = useParams()
    return(
        <div className="about">
            <AdminDishForm />

        </div>
    )
}

export default About