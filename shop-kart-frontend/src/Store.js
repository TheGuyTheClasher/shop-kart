// this is a reaact context store, used to pass data directly from component to component.
// In simple words, data present here is global and any component can directly access it.

import { createContext, useReducer } from 'react'

export const Store = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            return {
                ...state, cart: { ...state.cart, cartItems: [...state.cart.cartItems, action.payload] }
            };
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

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}