
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TweenMax, TimelineMax } from 'gsap'
import bodymovin from 'bodymovin'
import 'reset-css/reset.css'

import * as SessionActions from '../../actions/session'
import { POLLING_FREQUENCY, STATUS_DECAY_TIMEOUT } from '../../constants'
import style from './style.css'

import hitAnimation from '../../assets/json/hit.json'
import missAnimation from '../../assets/json/miss.json'

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      statusCopySE: null,
      statusCopyEN: null
    }

    this._timeout = null
  }

  componentDidMount () {
    this.startPolling()

    document.getElementsByTagName('body')[0].addEventListener('touch', (event) => {
      event.prevenDefault()
      event.stopPropagation()
    })

    this.reset()
  }

  componentWillReceiveProps (nextProps) {
    const isNewTouch = (
      nextProps.session &&
      this.props.session.stations[6] &&
      this.props.session.stations[6][26] &&
      nextProps.session.stations[6][26] !== this.props.session.stations[6][26]
    )
    if (isNewTouch) {
      this.transitionToStatusSection()
    }
  }

  updateCopy () {
    this.setState({
      statusCopySE: this.getStatusCopy('se'),
      statusCopyEN: this.getStatusCopy('en')
    })
  }

  makeRevealTimeline (soft=false) {
    const timeline = new TimelineMax()
    if (!soft) {
      timeline.add(TweenMax.to('#info-section', 0.5, { opacity: 1 }))
      timeline.add(TweenMax.to('#headline', 0.5, { opacity: 1 }))
      timeline.add(TweenMax.to('#info-section', 0.5, { opacity: 0, delay: 5 }))
    }

    timeline.add(TweenMax.to('#status-section', 0.5, { opacity: 1, onStart: this.updateCopy.bind(this) }))
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

    .add(TweenMax.to('#headline', duration, { opacity: 0 }))
    .add(TweenMax.to('#status-section', duration, { overwrite: 1, opacity: 0 }), `-=${duration}`)
    .add(TweenMax.to('#info-section', duration, { overwrite: 1, opacity: 0 }))
    .add(TweenMax.allTo([
      `.${style['room-1']}`,
      `.${style['room-2']}`,
      `.${style['room-3']}`,
      `.${style['room-4']}`,
      `.${style['room-5']}`
    ], duration, {
      opacity: 0,
      onComplete: () => {
        [1, 2, 3, 4, 5].forEach((i) => document.getElementById(`room-${i}`).innerHTML = '')
      }
    }), `-=${duration}`)
  }

  softReset (duration=0, parameters={}) {
    return new TimelineMax(parameters)
    .add(TweenMax.to('#status-section', duration, { overwrite: 1, opacity: 0 }))

    .add(TweenMax.allTo([
      `.${style['room-1']}`,
      `.${style['room-2']}`,
      `.${style['room-3']}`,
      `.${style['room-4']}`,
      `.${style['room-5']}`
    ], duration, {
      overwrite: 1,
      opacity: 0,
      onComplete: () => {
        [1, 2, 3, 4, 5].forEach((i) => document.getElementById(`room-${i}`).innerHTML = '')
      }
    }))
  }

  transitionToStatusSection () {
    clearTimeout(this._timeout)
    if (document.getElementById('status-section').style.opacity > 0.9) {
      this.softReset(0.5, {
        onComplete: this.makeRevealTimeline.bind(this, true)
      })
    } else {
      this.makeRevealTimeline()
    }
    this._timeout = setTimeout(() => {
      this.reset(2)
    }, STATUS_DECAY_TIMEOUT)
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

  getStatusList () {
    return [1, 2, 3, 4, 5].reduce((result, index) => {
      result[index] = this.getRoomStatus(index)
      return result
    }, [])
  }

  getStatusCopy (locale) {
    const status = this.getStatusList()
    const missing = status.reduce((result, completed, room) => {
      if (!completed) result.push(room)
      return result
    }, [])
    if (locale === 'se') {
      if (missing.length) { // something missing
        return (
          <div>Du har använt ljuset klokt men missat något i rum {missing.join(', ').replace(/, (\d)$/, ' och $1')}.<br/>Ta ett extra varv och kom sedan tillbaka hit.</div>
        )
      } else { // all complete
        return (
          <div>Grattis. Du har använt ljuset klokt.<br/>Lämna ditt ljus till personalen i<br/>audioguidedisken och hämta upp<br/>din belöning. </div>
        )
      }
    } else {
      if (missing.length) { // something missing
        return (
          <div>You have used the light wisely but missed something in room {missing.join(', ').replace(/, (\d)$/, ' and $1')}.<br/>Look it up – then come back here.</div>
        )
      } else { // all complete
        return (
          <div>Congratulations. You’ve used the<br/>light wisely. You’ll find a reward<br/>waiting for you at the audioguide<br/>disk. Bring your light. </div>
        )
      }
    }
  }

  render() {
    const { session, actions, children } = this.props
    return (
      <div className={style['normal']}>
        <h1 id="headline">Ljusresan • The Journey of Light</h1>
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
            {this.state.statusCopySE}
            {this.state.statusCopyEN}
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
