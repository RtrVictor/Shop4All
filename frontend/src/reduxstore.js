import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productSingleReducer,
} from './reduceres/productReducers'
import { shoppingCartReducer } from './reduceres/shoppingCartReducers'
import { loginReducer } from './reduceres/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productSingle: productSingleReducer,
  shoppingCart: shoppingCartReducer,
  login: loginReducer,
})
const shoppingCartProductsFromLocalStorage = localStorage.getItem(
  'shoppingCartProducts'
)
  ? JSON.parse(localStorage.getItem('shoppingCartProducts'))
  : []

const userFromLocalStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const initialState = {
  shoppingCart: { shoppingCartProducts: shoppingCartProductsFromLocalStorage },
  login: { user: userFromLocalStorage },
}
const middleware = [thunk]
const reduxStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default reduxStore
