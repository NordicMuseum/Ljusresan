
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SessionActions from '../../actions/session'
import style from './style.css'

class App extends Component {
  render() {
    const { session, actions, children } = this.props
    return (
      <div className={style.normal}>
        {children}
        <div>
          {session.tagUid}
        </div>
        <div>
          {session.updatedAt}
        </div>
        <div>
          {session.stations.map((station, index) => (
            <p key={index}>{station}</p>
          ))}
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
)(App)
