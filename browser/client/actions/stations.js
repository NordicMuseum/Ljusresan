
import { createAction } from 'redux-actions'
import request from 'superagent-bluebird-promise'

export const fetchStations = () => (dispatch) => {
  return request.post(`/api`).send()

  .then(({body}) => {
    dispatch({
      type: 'update stations',
      payload: body
    })
  })
}