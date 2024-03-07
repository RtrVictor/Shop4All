import axios from 'axios'

//Redux-thunk is for function inside function (async() inside listOfProducts)

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
