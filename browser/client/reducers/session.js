
import { handleActions } from 'redux-actions'

const initialState = {
  updatedAt: null,
  tagUid: null,
  stations: [],
  rooms: []
}

const validateCompletion = (roomId, numStations) => {
  switch (parseInt(roomId, 10)) {
    case 1:
      return !!(numStations)
    case 2:
      return !!(numStations === 3)
    case 3:
      return !!(numStations > 5)
    case 4:
      return !!(numStations === 8)
    case 5:
      return !!(numStations === 6)
    case 6:
      return !!(numStations)
  }
}

export default handleActions({
  'sync session' (state, action) {
    if (!action.payload) {
      return initialState
    }
    return {
      updatedAt: action.payload.updated_at,
      tagUid: action.payload.tagUid,
      // stations: action.payload.stations, // .map() - check for room completetion
      stations: Object.keys(action.payload.stations)

        .map((roomId) => (
          {
            ...action.payload.stations[roomId],
            id: roomId,
            completed: validateCompletion(
              roomId,
              Object.keys(action.payload.stations[roomId]).length
            )
          }
        ))

        .reduce((previous, value, index, origin) => {
          const roomId = value.id
          const roomData = {
            ...value
          }
          return {
            ...previous,
            [roomId]: roomData
          }
        }, {})
    }
  }
}, initialState)
