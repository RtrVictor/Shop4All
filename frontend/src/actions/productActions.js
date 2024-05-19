import axios from 'axios'

//Redux-thunk is for function inside function(callback) (async() inside listOfProducts)
//listOfProducts outer function synchronous and async(dispatch) inner function asynchronous

//Async = makes a function return a promise
//Await = makes an async function wait for a promise

//The whole list of products
export const listOfProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCTLIST_REQUEST' })
    const { data } = await axios.get('/api/products')

    dispatch({ type: 'PRODUCTLIST_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'PRODUCTLIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
//A single product
export const singleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCTSINGLE_REQUEST' })
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({ type: 'PRODUCTSINGLE_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'PRODUCTSINGLE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

//Delete a single product
export const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PRODUCTDELETE_REQUEST' })

    const {
      login: { user },
    } = getState()

    const configuration = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }

    await axios.delete(`/api/products/${id}`, configuration)

    dispatch({ type: 'PRODUCTDELETE_SUCCESS' })
  } catch (error) {
    dispatch({
      type: 'PRODUCTDELETE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const createProductAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PRODUCTCREATE_REQUEST' })

    const {
      login: { user },
    } = getState()

    const configuration = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    //Added empty object {} because we don't actually send anything
    const { data } = await axios.post('/api/products', {}, configuration)
    dispatch({ type: 'PRODUCTCREATE_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'PRODUCTCREATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const updateProductAction =
  (updatedProduct) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'PRODUCTUPDATE_REQUEST' })

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
        `/api/products/${updatedProduct._id}`,
        updatedProduct,
        configuration
      )

      dispatch({ type: 'PRODUCTUPDATE_SUCCESS', payload: data })
    } catch (error) {
      dispatch({
        type: 'PRODUCTUPDATE_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      })
    }
  }

export const createReviewAction =
  (id, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'CREATEREVIEW_REQUEST' })

      const {
        login: { user },
      } = getState

      const configuration = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }

      await axios.post(`/api/products/reviews/${id}`, review, configuration)
      dispatch({ type: 'CREATEREVIEW_SUCCESS' })
    } catch (error) {
      dispatch({
        type: 'CREATEREVIEW_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      })
    }
  }
