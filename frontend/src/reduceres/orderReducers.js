//Create an order
export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATEORDER_REQUEST':
      return { loading: true }
    case 'CREATEORDER_SUCCESS':
      return { loading: false, success: true, order: action.payload }
    case 'CREATEORDER_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
// Details for an order
export const detailsOrderReducer = (
  state = { loading: true, order: null, shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case 'DETAILSORDER_REQUEST':
      return { ...state, loading: true }
    case 'DETAILSORDER_SUCCESS':
      return { loading: false, order: action.payload }
    case 'DETAILSORDER_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
// Payment
export const payOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PAYORDER_REQUEST':
      return { loading: true }
    case 'PAYORDER_SUCCESS':
      return { loading: false, success: true }
    case 'PAYORDER_FAIL':
      return { loading: false, error: action.payload }
    case 'PAYORDER_RESET':
      return {}
    default:
      return state
  }
}
// Get a list of all the orders of the logged in user
export const loggedUserOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case 'USERORDER_REQUEST':
      return { loading: true }
    case 'USERORDER_SUCCESS':
      return { loading: false, userOrder: action.payload }
    case 'USERORDER_FAIL':
      return { loading: false, error: action.payload }
    case 'USERORDER_RESET':
      return { orders: [] }
    default:
      return state
  }
}
//Get a list of all the orders
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case 'ORDERLIST_REQUEST':
      return { loading: true }
    case 'ORDERLIST_SUCCESS':
      return { loading: false, orders: action.payload }
    case 'ORDERLIST_FAIL':
      return { loading: false, error: action.payload }
    case 'ORDERLIST_RESET':
      return { orders: [] }
    default:
      return state
  }
}
//Delete an order
export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDERDELETE_REQUEST':
      return { loading: true }
    case 'ORDERDELETE_SUCCESS':
      return { loading: false, success: true }
    case 'ORDERDELETE_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
