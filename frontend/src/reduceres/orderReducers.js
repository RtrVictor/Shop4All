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
