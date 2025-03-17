import { useContext } from "react";
import { MdClose } from "react-icons/md";
import prod from "../../../assets/products/earbuds-prod-1.webp";
import "./CartItem.scss";
import { Context } from "../../../utils/context";

const CartItem = () => {
    const { cartItems, handleRemoveFromCart, handleCartProductQuantity} = useContext(Context);
    
    return (
        <div className="cart-products">
            {cartItems?.map((item) => (
                <div key={item.id} className="cart-product">
                    <div className="img-container">
                        <img src={process.env.REACT_APP_DEV_URL + item.img[0].url} alt="" />
                        
                    </div>
                    <div className="prod-details">
                        <span className="name">{item.title}</span>
                        <MdClose className="close-btn" onClick={() =>handleRemoveFromCart(item)}/>
                        <div className="quantity-buttons">
                            <span onClick={()=> handleCartProductQuantity('dec', item)}>-</span>
                            <span>{item.quantity}</span>
                            <span onClick={()=> handleCartProductQuantity('inc', item)}>+</span>
                        </div>
                        <div className="text">
                            <span>{item.quantity}</span>
                            <span>x</span>
                            <span className="highlight">&#8364;{item.price * item.quantity}</span>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    );
};

export default CartItem;
