import axios from 'axios'

//Async = makes a function return a promise
//Await = makes an async function wait for a promise

export const addToShoppingCart =
  (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: 'SHOPPINGCART_ADD',
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      },
    })

    // Update localStorage after dispatching the action
    localStorage.setItem(
      'shoppingCartProducts',
      JSON.stringify(getState().shoppingCart.shoppingCartProducts)
    )
  }

export const removeFromShoppingCart = (id) => async (dispatch, getState) => {
  dispatch({ type: 'SHOPPINGCART_REMOVE', payload: id })
  //Update localStorage after removing an item
  localStorage.setItem(
    'shoppingCartProducts',
    JSON.stringify(getState().shoppingCart.shoppingCartProducts)
  )
}

export const decreaseQuantity = (id) => async (dispatch, getState) => {
  dispatch({ type: 'DECREASE_QUANTITY', payload: id })
  //Update localStorage after decreasing the quantity
  localStorage.setItem(
    'shoppingCartProducts',
    JSON.stringify(getState().shoppingCart.shoppingCartProducts)
  )
}
