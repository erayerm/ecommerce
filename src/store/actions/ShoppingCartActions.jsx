import { ShoppingCartActionTypes } from "../reducers/ShoppingCartActionReducer";

export const setCartAction = (data) => {
    return { type: ShoppingCartActionTypes.setCart, payload: data }
}
export const setPaymentAction = (data) => {
    return { type: ShoppingCartActionTypes.setPayment, payload: data }
}
export const setAddressAction = (data) => {
    return { type: ShoppingCartActionTypes.setAddress, payload: data }
}