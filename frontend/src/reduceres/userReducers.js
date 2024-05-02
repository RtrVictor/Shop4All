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

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USERREGISTER_REQUEST':
      return { loading: true }
    case 'USERREGISTER_SUCCESS':
      return { loading: false, user: action.payload }
    case 'USERREGISTER_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case 'USERDETAILS_REQUEST':
      return { ...state, loading: true }
    case 'USERDETAILS_SUCCESS':
      return { loading: false, user: action.payload }
    case 'USERDETAILS_FAIL':
      return { loading: false, error: action.payload }
    case 'USERDETAILS_RESET':
      return { user: {} }
    default:
      return state
  }
}

export const updateUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USERUPDATEDETAILS_REQUEST':
      return { loading: true }
    case 'USERUPDATEDETAILS_SUCCESS':
      return { loading: false, success: true, user: action.payload }
    case 'USERUPDATEDETAILS_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case 'USERALL_REQUEST':
      return { loading: true }
    case 'USERALL_SUCCESS':
      return { loading: false, users: action.payload }
    case 'USERALL_FAIL':
      return { loading: false, error: action.payload }
    case 'USERALL_RESET':
      return { users: [] }
    default:
      return state
  }
}

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETEUSER_REQUEST':
      return { loading: true }
    case 'DELETEUSER_SUCCESS':
      return { loading: false, success: true }
    case 'DELETEUSER_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
