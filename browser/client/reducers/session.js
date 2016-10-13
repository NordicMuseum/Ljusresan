
import { handleActions } from 'redux-actions'

const initialState = {
  updatedAt: null,
  tagUid: null,
  stations: []
}

export default handleActions({
  'sync session' (state, action) {
    return {
      updatedAt: action.payload.updatedAt,
      tagUid: action.payload.tagUid,
      stations: action.payload.stations
    }
  }
}, initialState)
