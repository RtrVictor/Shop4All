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
