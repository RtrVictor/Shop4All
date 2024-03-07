//Add/remove a product to shopping cart
export const shoppingCartReducer = (
  state = { shoppingCartProducts: [] },
  action
) => {
  switch (action.type) {
    case 'SHOPPINGCART_ADD':
      const existProduct = state.shoppingCartProducts.find(
        (x) => x.product === action.payload.product
      )

      if (existProduct) {
        return {
          ...state,
          shoppingCartProducts: state.shoppingCartProducts.map((x) =>
            x.product === existProduct.product ? action.payload : x
          ),
        }
      } else {
        return {
          ...state,
          shoppingCartProducts: [...state.shoppingCartProducts, action.payload],
        }
      }

    default:
      return state
  }
}
