import { instance } from "../../instance";
import { ProductActionTypes } from "../reducers/ProductReducer";

export const setProductsAction = (data) => {
    return { type: ProductActionTypes.setProduct, payload: data }
}

export const setLoadingAction = (bool) => {
    return { type: ProductActionTypes.setLoading, payload: bool }
}

export const fetchProducts = (category = "", filter = "", sort = "") => async (dispatch) => {
    await instance
        .get(("/products"), {
            params: {
                "category": category,
                "filter": filter,
                "sort": sort,
                "limit": 100
            }
        })
        .then((res) => dispatch(setProductsAction(res.data)))
        .then(() => dispatch(setLoadingAction(false)))
        .catch((err) => console.error(err))
};