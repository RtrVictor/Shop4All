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

//Delete a product
export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCTDELETE_REQUEST':
      return { loading: true }
    case 'PRODUCTDELETE_SUCCESS':
      return { loading: false, success: true }
    case 'PRODUCTDELETE_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//Create a product
export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCTCREATE_REQUEST':
      return { loading: true }
    case 'PRODUCTCREATE_SUCCESS':
      return { loading: false, product: action.payload, success: true }
    case 'PRODUCTCREATE_FAIL':
      return { loading: false, error: action.payload }
    case 'PRODUCTCREATE_RESET':
      return {}
    default:
      return state
  }
}

//Update a product
export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PRODUCTUPDATE_REQUEST':
      return { loading: true }
    case 'PRODUCTUPDATE_SUCCESS':
      return { loading: false, product: action.payload, success: true }
    case 'PRODUCTUPDATE_FAIL':
      return { loading: false, error: action.payload }
    case 'PRODUCTUPDATE_RESET':
      return { product: {} }
    default:
      return state
  }
}

//Create a review
export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATEREVIEW_REQUEST':
      return { loading: true }
    case 'CREATEREVIEW_SUCCESS':
      return { loading: false, success: true }
    case 'CREATEREVIEW_FAIL':
      return { loading: false, error: action.payload }
    case 'CREATEREVIEW_RESET':
      return {}
    default:
      return state
  }
}
