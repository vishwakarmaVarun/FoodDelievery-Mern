import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type){
        case 'ADD':
            return [...state, {id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price}]
        case 'REMOVE':
            // return state.filter((item, index) => index !== action.index);
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case 'UPDATE':
            return state.map(food => {
                if (food.id === action.id) {
                    return {
                        ...food,
                        qty: parseInt(action.qty) + food.qty,
                        price: action.price + food.price
                    };
                }
                return food;
            });
        // case 'DROP':
        //     return [];
        default:
            return state;
    }
}

export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);