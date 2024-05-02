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
  dispatch({ type: 'USERDETAILS_RESET' })
  dispatch({ type: 'USERORDER_RESET' })
  dispatch({ type: 'USERALL_RESET' })
}

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'USERREGISTER_REQUEST' })

    const configuration = {
      headers: {
        'Content-Type': 'Application/json',
      },
    }
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      configuration
    )

    //If registration successfull then user is logged in
    dispatch({ type: 'USERREGISTER_SUCCESS', payload: data })
    dispatch({ type: 'USERLOGIN_SUCCESS', payload: data })

    localStorage.setItem('user', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: 'USERREGISTER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const detailsUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USERDETAILS_REQUEST' })
    //Getting token
    const {
      login: { user },
    } = getState()

    const configuration = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/${id}`, configuration)
    dispatch({ type: 'USERDETAILS_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'USERDETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const updateDetailsUser =
  (updatedUser) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'USERUPDATEDETAILS_REQUEST' })
      //Getting token
      const {
        login: { user },
      } = getState()

      const configuration = {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/users/profile`,
        updatedUser,
        configuration
      )
      dispatch({ type: 'USERUPDATEDETAILS_SUCCESS', payload: data })
    } catch (error) {
      dispatch({
        type: 'USERUPDATEDETAILS_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      })
    }
  }

export const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USERALL_REQUEST' })
    //Getting token
    const {
      login: { user },
    } = getState()

    const configuration = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const { data } = await axios.get('/api/users', configuration)

    dispatch({ type: 'USERALL_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'USERALL_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'DELETEUSER_REQUEST' })

    const {
      login: { user },
    } = getState()

    const configuration = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const { data } = await axios.delete(`/api/users/${id}`, configuration)
    dispatch({ type: 'DELETEUSER_SUCCESS' })
  } catch (error) {
    dispatch({
      type: 'DELETEUSER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
