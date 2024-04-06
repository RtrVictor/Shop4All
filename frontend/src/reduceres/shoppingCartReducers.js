//Add/remove a product to shopping cart
export const shoppingCartReducer = (
  state = { shoppingCartProducts: [], deliveryAddress: {} },
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
    case 'SHOPPINGCART_REMOVE':
      return {
        ...state,
        shoppingCartProducts: state.shoppingCartProducts.filter(
          (x) => x.product !== action.payload
        ),
      }
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        shoppingCartProducts: state.shoppingCartProducts.map((product) =>
          product.product === action.payload
            ? { ...product, quantity: Math.max(product.quantity - 1, 0) } // Decrement quantity
            : product
        ),
      }
    case 'DELIVERYADDRESS_ADD':
      return {
        ...state,
        deliveryAddress: action.payload,
      }
    case 'PAYMENTMETHOD_ADD':
      return {
        ...state,
        paymentMethod: action.payload,
      }
    default:
      return state
  }
}
