export const UserActionTypes = {
    setProductList: "SET_PRODUCT_LIST",
    setTotalProductCount: "SET_TOTAL_PRODUCT_COUNT",
    setPageCount: "SET_PAGE_COUNT",
    setActivePage: "SET_ACTIVE_PAGE",
    setFetchState: "SET_FETCH_STATE"
}

const initialState = {
    productList: [],
    totalProductCount: 0,
    pageCount: 0,
    activePage: 0,
    fetchState: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.setProductList:
            return { ...state, productList: action.payload }
        case UserActionTypes.setTotalProductCount:
            return { ...state, totalProductCount: action.payload }
        case UserActionTypes.setPageCount:
            return { ...state, pageCount: action.payload }
        case UserActionTypes.setActivePage:
            return { ...state, activePage: action.payload }
        case UserActionTypes.setFetchState:
            return { ...state, fetchState: action.payload }
        default:
            return state;
    }
}


export default reducer