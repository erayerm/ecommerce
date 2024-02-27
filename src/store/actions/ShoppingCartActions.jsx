import { ShoppingCartActionTypes } from "../reducers/ShoppingCartReducer";

export const addToCartAction = (data) => {
    return { type: ShoppingCartActionTypes.addToCart, payload: data }
}
export const removeFromCartAction = (data) => {
    return { type: ShoppingCartActionTypes.removeFromCart, payload: data }
}
export const setPaymentAction = (data) => {
    return { type: ShoppingCartActionTypes.setPayment, payload: data }
}
export const setAddressAction = (data) => {
    return { type: ShoppingCartActionTypes.setAddress, payload: data }
}