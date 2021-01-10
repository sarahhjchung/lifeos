import * as Noise from './lib/noise'
import * as Beats from './lib/beats'
import * as Spotify from './lib/spotify'

const state = {
  view: 'idle',
  mode: 'none',
  timer: 0,
  alarm: null,
  paused: true,
  volume: 50,
  noiseColor: 'brown',
  beatsPitch: 200,
  beatsPattern: 'alpha',
  song: null
}

const actions = {
  start (ticks) {
    state.view = 'work'
    state.timer = ticks
    actions.play()
  },

  play () {
    state.paused = false
    actions.playAudio()
    chrome.alarms.create({ when: Date.now() + state.timer * 1000 })
  },

  pause () {
    state.paused = true
    actions.stopAudio()
    chrome.alarms.get(alarm => {
      const ticks = Math.floor((alarm.scheduledTime - Date.now()) / 1000)
      state.timer = ticks
    })
    chrome.alarms.clear()
  },

  stop () {
    state.view = 'idle'
  },

  playAudio () {
    if (state.mode === 'noise') {
      if (state.noiseColor === 'white') {
        Noise.playWhite()
      } else if (state.noiseColor === 'pink') {
        Noise.playPink()
      } else if (state.noiseColor === 'brown') {
        Noise.playBrown()
      }
    } else if (state.mode === 'beats') {
      Beats.playBeats()
    } else if (state.mode === 'spotify' && state.token) {
      actions.playSpotify()
    }
  },

  stopAudio () {
    if (state.mode === 'noise') {
      Noise.stop()
    } else if (state.mode === 'beats') {
      Beats.stopBeats()
    } else if (state.mode === 'spotify' && state.token) {
      Spotify.pause()
    }
  },

  changeMode (value) {
    actions.stopAudio()
    state.mode = value
    actions.playAudio()
  },

  changeNoise (value) {
    actions.stopAudio()
    state.mode = value
    actions.playAudio()
  },

  changeBeats (value) {
    actions.stopAudio()
    Beats.setPattern(value)
    actions.playAudio()
  }
}

function listen (message) {
  const [msgtype, ...msgdata] = message
  if (actions[msgtype]) {
    actions[msgtype](...msgdata)
  }
}

chrome.runtime.onInstalled.addListener(() => {
  // clear old alarm if existent (for debugging)
  chrome.alarms.clear()
  chrome.runtime.onConnect.addListener(port => {
    if (state.view === 'work' && !state.paused) {
      chrome.alarms.get(alarm => {
        const ticks = Math.floor((alarm.scheduledTime - Date.now()) / 1000)
        state.timer = ticks
        port.postMessage(['state', state])
        port.onMessage.addListener(listen)
      })
    } else {
      port.postMessage(['state', state])
      port.onMessage.addListener(listen)
    }
  })
})
