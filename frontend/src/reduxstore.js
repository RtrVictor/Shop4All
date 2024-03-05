import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productSingleReducer,
} from './reduceres/productReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productSingle: productSingleReducer,
})
const initialState = {}
const middleware = [thunk]
const reduxStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default reduxStore
