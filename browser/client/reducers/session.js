
import { handleActions } from 'redux-actions'

const initialState = {
  updatedAt: null,
  tagUid: null,
  stations: [],
  rooms: []
}

const validateCompletion = (room) => {
  switch (room.id) {
    case 1:
      return !!(room.stations.length)
    case 2:
      return !!(room.stations.length === 3)
    case 3:
      return !!(room.stations.length > 5)
    case 4:
      return !!(room.stations.length === 8)
    case 5:
      return !!(room.stations.length === 6)
    case 6:
      return !!(room.stations.length)
  }
}

export default handleActions({
  'sync session' (state, action) {
    return {
      updatedAt: action.payload.updatedAt,
      tagUid: action.payload.tagUid,
      stations: action.payload.stations,
      rooms: action.payload.stations.reduce((previous, data, index, origin) => {
        let [station, room] = data.split(':')
        room = parseInt(room, 10)
        if (!previous[room - 1]) {
          previous[room - 1] = {
            id: room,
            completed: false,
            stations: []
          }
        }
        const target = previous[room - 1]
        target.stations.push(station)
        target.completed = validateCompletion(target)
        return previous
      }, [])
    }
  }
}, initialState)
