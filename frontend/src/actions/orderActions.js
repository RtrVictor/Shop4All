import axios from 'axios'

//Create an order action
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

//Get the details action
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

// Payment action
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

//Get all orders for the logged in user
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

//Get a list of all the orders
export const orderListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDERLIST_REQUEST' })

    const {
      login: { user },
    } = getState()

    const configuration = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    const { data } = await axios.get('/api/orders', configuration)

    dispatch({ type: 'ORDERLIST_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'ORDERLIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

//Delete a single order
export const deleteOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDERDELETE_REQUEST' })
    const {
      login: { user },
    } = getState()

    const configuration = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    await axios.delete(`/api/orders/${id}`, configuration)

    dispatch({ type: 'ORDERDELETE_SUCCESS' })
  } catch (error) {
    dispatch({
      type: 'ORDERDELETE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
