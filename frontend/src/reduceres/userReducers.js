export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USERLOGIN_REQUEST':
      return { loading: true }
    case 'USERLOGIN_SUCCESS':
      return { loading: false, user: action.payload }
    case 'USERLOGIN_FAIL':
      return { loading: false, error: action.payload }
    case 'USERLOGOUT':
      return {}
    default:
      return state
  }
}
