// this is a reaact context store, used to pass data directly from component to component.
// In simple words, data present here is global and any component can directly access it.

import { createContext, useReducer } from 'react'

export const Store = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);

            const cartItems = existItem ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems, newItem]
            return {
                ...state, cart: { ...state.cart, cartItems }
            };
        case 'CART_REMOVE_ITEM':
            const itemToRemove = action.payload;
            const filteredCartItems = state.cart.cartItems.filter((item) => item._id !== itemToRemove.product._id)
            state.cart.cartItems = filteredCartItems
            return {
                ...state, cart: { ...state.cart, filteredCartItems }
            };
        case 'CART_REMOVE_ONE':
            const idToRemove = action.payload.id;
            const newQuantity = action.payload.quantity;

            const foundCartItemIndex = state.cart.cartItems.findIndex((item) => item._id === idToRemove)
            state.cart.cartItems[foundCartItemIndex].quantity = newQuantity;

            return {
                ...state
            }
        case 'CART_ADD_ONE':
            const idToAdd = action.payload.id;
            const newQty = action.payload.quantity;

            const CartItemIndex = state.cart.cartItems.findIndex((item) => item._id === idToAdd)
            state.cart.cartItems[CartItemIndex].quantity = newQty;

            return {
                ...state
            }
        default:
            return state;
    }
}

const initialState = {
    cart: {
        cartItems: [],
    }
};

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = { state, dispatch };

    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    )
}