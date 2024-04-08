import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productSingleReducer,
} from './reduceres/productReducers'
import { shoppingCartReducer } from './reduceres/shoppingCartReducers'
import {
  loginReducer,
  registerReducer,
  userDetailsReducer,
  updateUserDetailsReducer,
} from './reduceres/userReducers'
import {
  createOrderReducer,
  detailsOrderReducer,
} from './reduceres/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productSingle: productSingleReducer,
  shoppingCart: shoppingCartReducer,
  login: loginReducer,
  register: registerReducer,
  userDetails: userDetailsReducer,
  updateUserDetails: updateUserDetailsReducer,
  createOrder: createOrderReducer,
  detailsOrder: detailsOrderReducer,
})
const shoppingCartProductsFromLocalStorage = localStorage.getItem(
  'shoppingCartProducts'
)
  ? JSON.parse(localStorage.getItem('shoppingCartProducts'))
  : []

const userFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const deliveryAddressFromLocalStorage = localStorage.getItem('deliveryAddress')
  ? JSON.parse(localStorage.getItem('deliveryAddress'))
  : null

const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : null

const initialState = {
  shoppingCart: {
    shoppingCartProducts: shoppingCartProductsFromLocalStorage,
    deliveryAddress: deliveryAddressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage,
  },
  login: { user: userFromLocalStorage },
}
const middleware = [thunk]
const reduxStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default reduxStore
