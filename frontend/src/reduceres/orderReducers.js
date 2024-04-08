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

export const detailsOrderReducer = (
  state = { loading: true, order: [], shippingAddress: {} },
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
