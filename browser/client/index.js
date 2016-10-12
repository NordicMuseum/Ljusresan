
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import configure from './store'
import { fetchStations } from './actions/stations'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

const syncStations = () => {
  return fetchStations(store.dispatch)()
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} onEnter={syncStations}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
