
import { handleActions } from 'redux-actions'

const initialState = [{
  activated: false,
  id: 0
}]

export default handleActions({
  'update stations' (state, action) {
    return action.payload.map((station) => (
      Object.assing(
        {},
        state.find(item => station.id === item.id),
        station
      )
    ))
  }
}, initialState)
