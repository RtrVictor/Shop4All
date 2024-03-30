import axios from 'axios'

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'USERLOGIN_REQUEST' })

    const configuration = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      configuration
    )

    dispatch({ type: 'USERLOGIN_SUCCESS', payload: data })

    localStorage.setItem('user', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: 'USERLOGIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem('user')
  dispatch({ type: 'USERLOGOUT' })
}
