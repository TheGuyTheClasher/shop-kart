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
                  Cart {
                    cart.cartItems.length > 0 && (<Badge pill bg="danger">{cart.cartItems.length}</Badge>)
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
