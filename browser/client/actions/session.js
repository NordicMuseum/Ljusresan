
import { createAction } from 'redux-actions'
import request from 'superagent-bluebird-promise'

export const syncSession = () => (dispatch) => {
  return request.get(`/api/final-station`).send()

  .then(({body}) => {
    dispatch({
      type: 'sync session',
      payload: body
    })
  })
}