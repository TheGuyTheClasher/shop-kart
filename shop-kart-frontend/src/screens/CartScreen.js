import { useContext } from 'react'
import { Store } from '../Store'
import { Helmet } from 'react-helmet-async'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MessageBox from '../components/MessageBox'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'


const CartScreen = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state

    const handleMinusFromCart = (product) => {

        const getItemQuantity = cartItems.find((item) => item._id === product._id)
        const quantity = getItemQuantity.quantity - 1;

        ctxDispatch({ type: 'CART_REMOVE_ONE', payload: { id: product._id, quantity: quantity } })
    }

    const handleAddFromCart = (product) => {

        const getItemQuantity = cartItems.find((item) => item._id === product._id)
        const quantity = getItemQuantity.quantity + 1;

        ctxDispatch({ type: 'CART_ADD_ONE', payload: { id: product._id, quantity: quantity } })

    }

    function handleDeleteFromCart(product) {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: { product } });
    }

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty.<Link to="/">Go shopping</Link>
                        </MessageBox>
                    ) : (
                        <ListGroup>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row className='align-items-center'>
                                        <Col md={4}>
                                            <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail" />{' '}
                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={3}>
                                            <Button variant='light' disabled={item.quantity === 1} onClick={() => handleMinusFromCart(item)}><i className='fas fa-minus-circle'></i></Button>{' '}
                                            <span>{item.quantity}</span>{' '}
                                            <Button variant='light' disabled={item.quantity >= item.countInStock} onClick={() => handleAddFromCart(item)}><i className='fas fa-plus-circle'></i></Button>
                                        </Col>
                                        <Col md={3}>???{item.price}</Col>
                                        <Col md={2}>
                                            <Button variant="light" onClick={() => handleDeleteFromCart(item)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    {cartItems.length > 0 &&
                        <Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>
                                            Subtotal of {cartItems.reduce((acc, curValue) => acc + curValue.quantity, 0)} {' '}items :

                                        </h3>
                                        <h3>
                                            ???
                                            {cartItems.reduce((acc, curValue) => acc + curValue.price * curValue.quantity, 0)}
                                        </h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button type="button">
                                                Proceed to checkout
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>}
                </Col>
            </Row>
        </div>
    );
}

export default CartScreen;