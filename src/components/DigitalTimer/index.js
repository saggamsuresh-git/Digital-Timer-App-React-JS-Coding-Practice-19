// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  //   state = {time: 25, isTimerRunning: true, minutes: ''}

  state = {
    minutes: 25,
    seconds: 0,
    isTimerRunning: false,
    // secondsRemaining: 0,
    // minutesRemaining: 0,
  }

  componentWillUnmount() {
    console.log('componentWillUnmount called')
  }

  pauseTheTimer = () => {
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
    // this.startTimer()
    this.clearInterval()
  }

  startTimer = () => {
    console.log('Play Button Clicked')
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
    this.timerID = setInterval(this.tick, 1000)
  }

  clearInterval = () => {
    clearInterval(this.timerID)
    console.log('timer cleared')
  }

  tick = () => {
    const {minutes, seconds} = this.state
    const timeInSeconds = minutes * 60 - seconds
    // const min = Math.floor(timeInSeconds / 60)
    // const sec = Math.floor(timeInSeconds % 60)
    if (timeInSeconds < 1) {
      this.clearInterval()
    } else {
      this.setState(prevState => ({seconds: prevState.seconds + 1}))
    }
  }

  resetButton = () => {
    console.log('Reset Clicked')
    this.setState({isTimerRunning: false, minutes: 25, seconds: 0})
    this.clearInterval()
    // this.startTimer()
  }

  decreaseCount = () => {
    const {minutes} = this.state
    if (minutes > 1) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
      }))
    }
  }

  increaseCount = () => {
    const {minutes} = this.state
    if (minutes <= 25) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
      }))
    }
  }

  render() {
    const stringifyMinutes = minutes => (minutes > 9 ? minutes : `0${minutes}`)
    const stringifySeconds = seconds => (seconds > 9 ? seconds : `0${seconds}`)
    const {minutes, seconds, isTimerRunning} = this.state
    const timeInSeconds = minutes * 60 - seconds
    const min = Math.floor(timeInSeconds / 60)
    const sec = Math.floor(timeInSeconds % 60)
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const playOrPauseText = isTimerRunning ? 'Pause' : 'Start'
    const startOrRunningText = isTimerRunning ? 'Running' : 'Paused'
    const pOP = isTimerRunning ? this.pauseTheTimer : this.startTimer
    return (
      <div className="bg-container">
        <div>
          <h1>Digital Timer</h1>
        </div>
        <div className="times-bottom-container">
          <div className="timer-image-container">
            <div className="main-timer">
              <h1 className="running-timer">
                {stringifyMinutes(min)}:{stringifySeconds(sec)}
              </h1>
              <p className="start-running-text">{startOrRunningText}</p>
            </div>
          </div>
          <div className="all-buttons-container">
            <div className="btn-containers">
              <div className="play-btn-container">
                <button id="playBtn" onClick={pOP} type="button">
                  <img
                    src={startOrPauseImgUrl}
                    alt={startOrPauseAltText}
                    className="icon"
                  />
                </button>
                <label htmlFor="playBtn">{playOrPauseText}</label>
              </div>
              <div className="play-btn-container">
                <button type="button" id="resetBtn" onClick={this.resetButton}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon"
                  />
                </button>
                <label htmlFor="resetBtn">Reset</label>
              </div>
            </div>
            <div className="play-pause-btn-container">
              <p>Set Timer limit</p>
              <div className="timer-counter">
                <button
                  onClick={this.decreaseCount}
                  disabled={isTimerRunning && 'disable'}
                  className="plus-minus-btn"
                  type="button"
                >
                  -
                </button>
                <div className="count">
                  <p>{minutes}</p>
                </div>
                <button
                  onClick={this.increaseCount}
                  disabled={isTimerRunning && 'disable'}
                  className="plus-minus-btn"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
