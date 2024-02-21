export const ShoppingCartActionTypes = {
    setCart: "SET_CART",
    setPayment: "SET_PAYMENT",
    setAddress: "SET_ADDRESS",
}

const initialState = {
    cart: [],
    payment: {},
    address: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ShoppingCartActionTypes.setCart:
            return { ...state, cart: action.payload }
        case ShoppingCartActionTypes.setPayment:
            return { ...state, payment: action.payload }
        case ShoppingCartActionTypes.setAddress:
            return { ...state, address: action.payload }
        default:
            return state;
    }

}


export default reducer