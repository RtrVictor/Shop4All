import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productSingleReducer,
  deleteProductReducer,
  createProductReducer,
  updateProductReducer,
  createReviewReducer,
} from './reduceres/productReducers'
import { shoppingCartReducer } from './reduceres/shoppingCartReducers'
import {
  loginReducer,
  registerReducer,
  userDetailsReducer,
  updateUserDetailsReducer,
  getAllUsersReducer,
  deleteUserReducer,
  updateUserReducer,
} from './reduceres/userReducers'
import {
  createOrderReducer,
  detailsOrderReducer,
  payOrderReducer,
  loggedUserOrderReducer,
  orderListReducer,
  deleteOrderReducer,
  deliveryOrderReducer,
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
  payOrder: payOrderReducer,
  loggedUserOrder: loggedUserOrderReducer,
  getAllUsers: getAllUsersReducer,
  deleteUser: deleteUserReducer,
  updateUser: updateUserReducer,
  deleteProduct: deleteProductReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  orderList: orderListReducer,
  deleteOrder: deleteOrderReducer,
  deliveryOrder: deliveryOrderReducer,
  createReview: createReviewReducer,
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
