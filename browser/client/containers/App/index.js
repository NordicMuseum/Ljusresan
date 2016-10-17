
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TweenMax } from 'gsap'
import 'reset-css/reset.css'

import * as SessionActions from '../../actions/session'
import { POLLING_FREQUENCY } from '../../constants'
import style from './style.css'

class App extends Component {

  componentDidMount () {
    this.startPolling()

    // set initial opacity
    TweenMax.to('#status-section', 0, {
      opacity: 0
    })
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.session &&
      this.props.session.updatedAt &&
      nextProps.session.updatedAt !== this.props.session.updatedAt) {

      this.transitionToStatusSection()
    }
  }

  startPolling () {
    this.props.actions.sync()

    .finally(setTimeout(() => {
      this.startPolling()
    }, POLLING_FREQUENCY))
  }

  transitionToStatusSection () {
    TweenMax.to('#info-section', 0.5, {
      opacity: 0
    })
    TweenMax.to('#status-section', 1, {
      opacity: 1,
      delay: 0.5
    })
  }

  render() {
    const { session, actions, children } = this.props
    return (
      <div className={style['normal']}>
        <h1>Ljusresan • The Journey of Light</h1>
        <section id="info-section" className={style['info-section']}>
          <div className={style['flame']}>flame</div>
          <div className={style['copy-content']}>
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
          <ol className={style['rooms']}>
            <li className={style['room-1']}></li>
            <li className={style['room-2']}></li>
            <li className={style['room-3']}></li>
            <li className={style['room-4']}></li>
            <li className={style['room-5']}></li>
          </ol>
          <div className={style['copy-content']}>
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
