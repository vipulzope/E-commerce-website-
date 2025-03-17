import "./Product.scss";
import { useNavigate } from "react-router-dom";

const Product = ({id, data}) => {
    const navigate = useNavigate();
    return (
        <div className="product-card" onClick={() => navigate("/product/"+id)}>
            <div className="thumbnail">
                <img
                    src={process.env.REACT_APP_DEV_URL + data.img[0].url} alt=""
                />
            </div>
            <div className="prod-details">
                <span className="name">{data.title}</span>
                <span className="price">&#8364;{data.price}</span>
            </div>
        </div>
    );
};

export default Product;
