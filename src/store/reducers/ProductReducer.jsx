export const ProductActionTypes = {
    setProduct: "SET_PRODUCT",
    setLoading: "SET_LOADING"
}

const initialState = {
    product: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ProductActionTypes.setProduct:
            return { ...state, product: action.payload.products }
        case ProductActionTypes.setLoading:
            return { ...state, loading: action.payload }
        default:
            return state;
    }
}


export default reducer