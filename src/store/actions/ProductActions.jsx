import { instance } from "../../instance";
import { ProductActionTypes } from "../reducers/ProductReducer";

export const setProductsAction = (data) => {
    return { type: ProductActionTypes.setProduct, payload: data }
}
export const setCurrentProductAction = (data) => {
    return { type: ProductActionTypes.setCurrentProduct, payload: data }
}
export const setLoadingAction = (bool) => {
    return { type: ProductActionTypes.setLoading, payload: bool }
}

export const fetchProducts = (category = null, filter = null, sort = null, limit = null, offset = null) => async (dispatch) => {
    await instance
        .get(("/products"), {
            params: {
                "category": category,
                "filter": filter,
                "sort": sort,
                "limit": limit,
                "offset": offset
            }
        })
        .then((res) => dispatch(setProductsAction(res.data)))
        .then(() => dispatch(setLoadingAction(false)))
        .catch((err) => console.error(err))
};

export const fetchProductsWithId = (id) => async (dispatch) => {
    await instance
        .get("/products/" + id)
        .then((res) => dispatch(setCurrentProductAction(res.data)))
        .catch((err) => console.error(err))
};