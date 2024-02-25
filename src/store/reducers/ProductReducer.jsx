export const ProductActionTypes = {
    setProduct: "SET_PRODUCT",
    setLoading: "SET_LOADING"
}

const initialState = {
    product: [],
    productCount: 0,
    loading: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ProductActionTypes.setProduct:
            return { ...state, product: action.payload.products, productCount: action.payload.total }
        case ProductActionTypes.setLoading:
            return { ...state, loading: action.payload }
        default:
            return state;
    }
}


export default reducer