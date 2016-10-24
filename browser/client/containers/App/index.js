
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TweenMax, TimelineMax } from 'gsap'
import bodymovin from 'bodymovin'
import 'reset-css/reset.css'

import * as SessionActions from '../../actions/session'
import { POLLING_FREQUENCY } from '../../constants'
import style from './style.css'

import hitAnimation from '../../assets/json/hit.json'
import missAnimation from '../../assets/json/miss.json'

class App extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.startPolling()

    this.reset()
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.session &&
      this.props.session.updatedAt &&
      nextProps.session.updatedAt !== this.props.session.updatedAt) {
      this.transitionToStatusSection()
    }
  }

  makeRevealTimeline () {
    const timeline = new TimelineMax()
    timeline.add(TweenMax.to('#info-section', 0.5, { opacity: 0 }))
    timeline.add(TweenMax.to('#status-section', 0.5, { opacity: 1 }))

    timeline.add(TweenMax.to(`.${style['room-1']}`, 0.2, {overwrite: 1, opacity: 1 }))
    timeline.add(TweenMax.to(`.${style['room-2']}`, 0.2, {overwrite: 1, opacity: 1 }))
    timeline.add(TweenMax.to(`.${style['room-3']}`, 0.2, {overwrite: 1, opacity: 1 }))
    timeline.add(TweenMax.to(`.${style['room-4']}`, 0.2, {overwrite: 1, opacity: 1 }))
    timeline.add(TweenMax.to(`.${style['room-5']}`, 0.2, {overwrite: 1, opacity: 1 }))

    timeline.add(TweenMax.to(`.${style['room-1']}`, 0.3, {opacity: 1, onComplete: this.runBodyMovin.bind(this, 1) }))
    timeline.add(TweenMax.to(`.${style['room-2']}`, 0.3, {opacity: 1, onComplete: this.runBodyMovin.bind(this, 2) }))
    timeline.add(TweenMax.to(`.${style['room-3']}`, 0.3, {opacity: 1, onComplete: this.runBodyMovin.bind(this, 3) }))
    timeline.add(TweenMax.to(`.${style['room-4']}`, 0.3, {opacity: 1, onComplete: this.runBodyMovin.bind(this, 4) }))
    timeline.add(TweenMax.to(`.${style['room-5']}`, 0.3, {opacity: 1, onComplete: this.runBodyMovin.bind(this, 5) }))

    return timeline
  }

  startPolling () {
    this.props.actions.sync()

    .finally(setTimeout(() => {
      this.startPolling()
    }, POLLING_FREQUENCY))
  }

  reset (duration=0, parameters={}) {
    return new TimelineMax(parameters)

    .add(TweenMax.to('#status-section', duration, { opacity: 0 }))
    .add(TweenMax.to('#info-section', duration, { opacity: 1 }))
    .add(TweenMax.allTo([
      `.${style['room-1']}`,
      `.${style['room-2']}`,
      `.${style['room-3']}`,
      `.${style['room-4']}`,
      `.${style['room-5']}`
    ], 0, {
      opacity: 0,
      onComplete: () => {
        [1, 2, 3, 4, 5].forEach((i) => document.getElementById(`room-${i}`).innerHTML = '')
      }
    }))
  }

  transitionToStatusSection () {
    if (document.getElementById('status-section').style.opacity > 0) {
      this.reset(0.5, {
        onComplete: this.makeRevealTimeline.bind(this)
      })
    } else {
      this.makeRevealTimeline()
    }
  }

  runBodyMovin(roomId) {
    bodymovin.loadAnimation({
      container: document.getElementById(`room-${roomId}`), // the dom element
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: this.getRoomStatus(roomId) ? hitAnimation : missAnimation
    })
  }

  getRoomStatus (roomId) {
    return (
      this.props.session.stations[roomId] &&
      this.props.session.stations[roomId].completed
    )
  }

  render() {
    const { session, actions, children } = this.props
    return (
      <div className={style['normal']}>
        <h1>Ljusresan • The Journey of Light</h1>
        <section id="info-section" className={style['info-section']}>
          <div className={style['flame']}><img src="../../assets/gif/light.gif"/></div>
          <div className={style['copy-content']}>
            <div>Din ljusresa närmar sig sitt slut.<br/><br/>Låt oss se om du klarat alla<br/>uppgifter.</div>
            <div>Your Journey of Light is coming<br/>to an end.<br/><br/>Let’s have a look if you’ve<br/>accomplished all the task.</div>
          </div>
        </section>
        <section id="status-section" className={style['status-section']}>
          <ol className={style['rooms']}>
            <li id="room-1" className={style['room-1']}></li>
            <li id="room-2" className={style['room-2']}></li>
            <li id="room-3" className={style['room-3']}></li>
            <li id="room-4" className={style['room-4']}></li>
            <li id="room-5" className={style['room-5']}></li>
          </ol>
          <div className={style['copy-content']}>
            <div>Du har använt ljuset klokt men<br/>missat något i rum 2 och 4.<br/>Ta ett extra varv och kom sedan<br/>tillbaka hit.</div>
            <div>You have used the light wisely but<br/>missed something in room 2 and 4.<br/>Look it up – then come back here.</div>
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
