
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Rating from "./Rating";

const Product = (props) => {
    const { product } = props;
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
                <Button>Add to cart</Button>
            </Card.Body>
        </Card>
    );
}

export default Product;