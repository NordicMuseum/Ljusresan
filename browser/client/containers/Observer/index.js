
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'reset-css/reset.css'

import * as SessionActions from '../../actions/session'
import { POLLING_FREQUENCY } from '../../constants'
import style from './style.css'

class Observer extends Component {

  componentDidMount () {
    this.startPolling()
  }

  startPolling () {
    this.props.actions.syncObserver()

    .finally(setTimeout(() => {
      this.startPolling()
    }, POLLING_FREQUENCY))
  }

  handleSessionEnd (event) {
    event.preventDefault()

    this.props.actions.endSession(this.props.session.tagUid)
  }

  render() {
    const { session, actions } = this.props
    return (
      <div className={style.normal}>
        <dl>
          <dt>Tag UID</dt>
          <dd>
            <pre>{session.tagUid}</pre>
          </dd>
          <dt>Registered at</dt>
          <dd>
            <pre>{session.updatedAt}</pre>
          </dd>
          <dt>Session status</dt>
          <dd>
            <table>
              <thead>
                <tr>
                  <td>Room</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
              {session.rooms.map((data, index) => {
                const {id, completed} = data
                return (
                  <tr key={index}>
                    <td>{id}</td>
                    <td style={{
                      backgroundColor: completed ? '#00CC00' : '#CC0000'
                    }}>{completed ? 'complete' : 'incomplete'}</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </dd>
          <dt>Log</dt>
          <dd>
            <pre>
              {session.stations.map((data, index) => {
                const [station, room] = data.split(':')
                return (`Room: ${room} Station: ${station}\n`)
              })}
            </pre>
          </dd>
        </dl>
        <div className={style['actions']}>
          <button onClick={this.handleSessionEnd.bind(this)}>
            End Session
          </button>
        </div>
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
)(Observer)
