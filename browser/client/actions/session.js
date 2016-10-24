
import { createAction } from 'redux-actions'
import request from 'superagent-bluebird-promise'

export const sync = () => (dispatch) => {
  return request.get(`/api/statuses/final`).send()

  .then(({body}) => {
    dispatch({
      type: 'sync session',
      payload: body
    })
  })
}

export const syncObserver = () => (dispatch) => {
  return request.get(`/api/statuses/observer`).send()

  .then(({body}) => {
    dispatch({
      type: 'sync session',
      payload: body
    })
  })
}

export const endSession = (tagUid) => (dispatch) => {
  return request.del(`/api/sessions`)

  .set('X-tagUid', tagUid)

  .send()
}