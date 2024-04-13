import axios from 'axios'

export const createOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'CREATEORDER_REQUEST' })

    const {
      login: { user },
    } = getState()

    const configuration = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }

    const { data } = await axios.post('/api/orders', order, configuration)
    dispatch({ type: 'CREATEORDER_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'CREATEORDER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const detailsOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'DETAILSORDER_REQUEST' })

    const {
      login: { user },
    } = getState()

    const configuration = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, configuration)
    dispatch({ type: 'DETAILSORDER_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'DETAILSORDER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const payOrderAction =
  (id, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'PAYORDER_REQUEST' })

      const {
        login: { user },
      } = getState()

      const configuration = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/orders/${id}/payment`,
        paymentResult,
        configuration
      )
      dispatch({ type: 'PAYORDER_SUCCESS', payload: data })
    } catch (error) {
      dispatch({
        type: 'PAYORDER_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      })
    }
  }

export const loggedUserOrderAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USERORDER_REQUEST' })

    const {
      login: { user },
    } = getState()

    const configuration = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const { data } = await axios.get('/api/orders/userorders', configuration)
    dispatch({ type: 'USERORDER_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'USERORDER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
