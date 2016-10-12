
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import stations from './stations'

export default combineReducers({
  routing,
  stations
})
