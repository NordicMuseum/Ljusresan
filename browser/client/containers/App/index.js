
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
      <div className={style['normal']}>
        <h1>Ljusresan • The Journey of Light</h1>
        <section id="info-section" className={style['info-section']}>
          <div className={style['flame']}>flame</div>
          <div className={style['initial-copy']}>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat.</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat.</div>
          </div>
        </section>
        <section id="status-section" className={style['status-section']}>
        </section>
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
