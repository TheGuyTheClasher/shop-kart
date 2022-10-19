import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap'
import Badge from 'react-bootstrap/esm/Badge';
import { useContext } from 'react'
import { Store } from './Store';
import CartScreen from './screens/CartScreen';

function App() {
  const { state } = useContext(Store)
  const { cart } = state;

  return (

    <Router>
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>shopkart</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart <i className="fas fa-shopping-cart"></i>{
                    cart.cartItems.length > 0 && (<Badge className='cart-pill' pill bg="danger">{cart.cartItems.reduce((acc, currentItem) => acc + currentItem.quantity, 0)}</Badge>)
                  }
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-5'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
