
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'reset-css/reset.css'

import * as SessionActions from '../../actions/session'
import { POLLING_FREQUENCY } from '../../constants'
import style from './style.css'

class App extends Component {

  componentDidMount () {
    this.startPolling()
  }

  startPolling () {
    this.props.actions.sync()

    .finally(setTimeout(() => {
      this.startPolling()
    }, POLLING_FREQUENCY))
  }

  render() {
    const { session, actions, children } = this.props
    return (
      <div className={style.normal}>
        {children}
        <dl>
          <dt>Tag UID</dt>
          <dd>{session.tagUid}</dd>
          <dt>Registered at</dt>
          <dd>{session.updatedAt}</dd>
          <dt>Stations discovered</dt>
          <dd>
            <table>
              <thead>
                <tr>
                  <td>Room</td>
                  <td>Station</td>
                </tr>
              </thead>
              <tbody>
              {session.stations.map((data, index) => {
                const [room, station] = data.split(':')
                return (
                  <tr key={index}>
                    <td>{room}</td>
                    <td>{station}</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </dd>
        </dl>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SessionActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
