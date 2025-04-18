import MakiSushi from "./ProductMaki";
import { useParams } from "react-router"

const OrderOnline = () => {
    const { orderId } = useParams()
    return (
        <div>
            <MakiSushi />
        </div>
    );
}

export default OrderOnline;