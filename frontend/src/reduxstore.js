import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productSingleReducer,
} from './reduceres/productReducers'
import { shoppingCartReducer } from './reduceres/shoppingCartReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productSingle: productSingleReducer,
  shoppingCart: shoppingCartReducer,
})
const shoppingCartProductsFromLocalStorage = localStorage.getItem(
  'shoppingCartProducts'
)
  ? JSON.parse(localStorage.getItem('shoppingCartProducts'))
  : []

const initialState = {
  shoppingCart: { shoppingCartProducts: shoppingCartProductsFromLocalStorage },
}
const middleware = [thunk]
const reduxStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default reduxStore
