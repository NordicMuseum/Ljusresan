
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
    return {
      updatedAt: action.payload.updatedAt,
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
          console.log(value)
          const roomData = {
            ...value
          }
          delete roomData.id
          return {
            ...previous,
            [roomId]: roomData
          }
        }, {})
    }
  }
}, initialState)
