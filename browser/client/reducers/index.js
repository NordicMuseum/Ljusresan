
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import session from './session'

export default combineReducers({
  routing,
  session
})
