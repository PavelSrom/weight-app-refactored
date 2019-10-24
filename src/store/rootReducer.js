import { combineReducers } from 'redux'
import userInfoReducer from './reducers/userInfoReducer'

// root reducer, that we provide to the store, it combines all other reducers we're using
const rootReducer = combineReducers({
  userInfo: userInfoReducer
})

export default rootReducer