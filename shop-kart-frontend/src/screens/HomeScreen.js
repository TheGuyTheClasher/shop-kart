// import data from "../data";
import { Link } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import axios from 'axios'

// reducer function is used as the replacement of the useState hook, 
// A reducer function is where you will put your state logic. It takes two arguments, the current state and the action object, and it returns the next state.
// state: is the current state
// action: is more like dependancy that changes the state and creates a new one

const reducer = (state, action) => {
    // return next state for React to set
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

const HomeScreen = () => {
    // const [products, setProducts] = useState([]);
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products')
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            <h1>Featured products</h1>
            <div className="products">
                {
                    loading ? <div>Loading...</div>
                        : error ? <div>{error}</div>
                            : products.map((product) => (
                                <div className="product" key={product.slug}>
                                    <Link to={`product/${product.slug}`}>
                                        <img src={product.image} alt={product.name} />
                                    </Link>
                                    <div className="productInfo">
                                        <Link to={`product/${product.slug}`}>
                                            <p>{product.name}</p>
                                        </Link>
                                        <p><strong>₹</strong>{product.price}</p>
                                        <button>Add to cart</button>
                                    </div>
                                </div>
                            ))
                }
            </div>
        </div>
    );
}

export default HomeScreen;