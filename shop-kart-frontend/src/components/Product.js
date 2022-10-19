
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Rating from "./Rating";
import { Context, useContext } from "react";
import { Store } from "../Store";
import { useState } from "react";

const Product = (props) => {
    const [cartButtons, setCartButtons] = useState(true)
    const { product } = props;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = state;

    // add to cart
    const addToCartHandler = (product) => {
        setCartButtons(false)
        const existItem = cart.cartItems.find((item) => item._id === product._id);
        const quantity = existItem ? existItem + 1 : 1;

        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    };

    //  Remove from cart
    const removeFromCartHandler = (product) => {
        setCartButtons(true);

        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: { product } })
    };

    return (
        <Card>
            <Link to={`product/${product.slug}`}>
                <img className="card-img-top" src={product.image} alt={product.name} />
            </Link>
            <Card.Body>
                <Link to={`product/${product.slug}`}>
                    <Card.Title className="cardTitle">{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text>₹{product.price}</Card.Text>
                {
                    product.countInStock
                        ? <div>
                            {cartButtons && <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>}
                            {!cartButtons && <Button onClick={() => removeFromCartHandler(product)} className="in-cart-btn">Remove from cart</Button>}
                        </div>
                        : <Button variant="light" className="out-of-stock"
                            style={{ border: "1px solid #D8D8D8" }}>Out of Stock</Button>
                }
            </Card.Body>
        </Card>
    );
}

export default Product;