
import { handleActions } from 'redux-actions'

const initialState = {
  updatedAt: null,
  tagUid: null,
  stations: []
}

const stationsPerRoom = {
  1: 1,
  2: 3,
  3: 6,
  4: 8,
  5: 6,
  6: 1
}

export default handleActions({
  'sync session' (state, action) {
    return {
      updatedAt: action.payload.updatedAt,
      tagUid: action.payload.tagUid,
      stations: action.payload.stations,
      rooms: action.payload.stations.reduce((previous, data, index, origin) => {
        const [room, station] = data.split(':')
        console.log(previous)
        if (!previous[room - 1]) {
          previous[room - 1] = {complete: false, stations: []}
          console.log('new room')
        }
        const target = previous[room - 1]
        target.stations.push(station)
        target.complete = stationsPerRoom[room] === target.stations.length
        return previous
      }, [])
    }
  }
}, initialState)
