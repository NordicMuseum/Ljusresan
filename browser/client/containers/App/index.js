
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as StationActions from '../../actions/stations'
import style from './style.css'

class App extends Component {
  render() {
    const { actions, children } = this.props
    return (
      <div className={style.normal}>
        {children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stations: state.stations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(StationActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
