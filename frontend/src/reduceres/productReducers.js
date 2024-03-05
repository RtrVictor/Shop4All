//List of products
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case 'PRODUCTLIST_REQUEST':
      return { loading: true, products: [] }
    case 'PRODUCTLIST_SUCCESS':
      return { loading: false, products: action.payload }
    case 'PRODUCTLIST_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//Single Product
export const productSingleReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case 'PRODUCTSINGLE_REQUEST':
      return { loading: true, ...state }
    case 'PRODUCTSINGLE_SUCCESS':
      return { loading: false, product: action.payload }
    case 'PRODUCTSINGLE_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
