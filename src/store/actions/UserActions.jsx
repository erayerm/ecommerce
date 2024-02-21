import { UserActionTypes } from "../reducers/UserReducer";

export const setProductListAction = (data) => {
    return { type: UserActionTypes.setProductList, payload: data }
}
export const setTotalProductCountAction = (data) => {
    return { type: UserActionTypes.setTotalProductCount, payload: data }
}
export const setPageCountAction = (data) => {
    return { type: UserActionTypes.setPageCount, payload: data }
}
export const setActivePageAction = (data) => {
    return { type: UserActionTypes.setActivePage, payload: data }
}
export const setFetchStateAction = (data) => {
    return { type: UserActionTypes.setFetchState, payload: data }
}