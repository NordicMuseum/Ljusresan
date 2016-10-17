
import { createAction } from 'redux-actions'
import request from 'superagent-bluebird-promise'

export const sync = () => (dispatch) => {
  return request.get(`/api/final-station`).send()

  .then(({body}) => {
    dispatch({
      type: 'sync session',
      payload: body
    })
  })
}

export const syncObserver = () => (dispatch) => {
  return request.get(`/api/final-station`).send()

  .then(({body}) => {
    dispatch({
      type: 'sync session',
      payload: body
    })
  })
}

export const endSession = (tagUid) => (dispatch) => {
  // TODO: some kind of request to end a session here...

  // return request.get(`/api/final-station`).send()

  // .then(({body}) => {
  //   dispatch({
  //     type: 'sync session',
  //     payload: body
  //   })
  // })
}