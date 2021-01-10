import m from 'mithril'
import * as Spotify from './lib/spotify'
import { toSeconds } from './lib/hummus'
import idle from './views/idle'
import work from './views/work'
import done from './views/done'

const views = { idle, work, done }
const port = chrome.runtime.connect({ name: 'popup' })
const actions = {
  start () {
    const hours = document.getElementById('hours').value || 0
    const mins = document.getElementById('mins').value || 0
    const secs = document.getElementById('secs').value || 0
    const ticks = toSeconds(hours + ':' + mins + ':' + secs)
    port.postMessage(['start', ticks])
    state.view = 'work'
    state.timer = ticks
    state.paused = false
  },

  pulse (song) {
    if (--state.timer < 0) {
      state.timer = 0
    }
    state.song = song
    m.redraw()
  },

  play () {
    state.paused = false
    port.postMessage(['play'])
  },

  pause () {
    state.paused = true
    port.postMessage(['pause'])
  },

  toggle () {
    if (state.paused) {
      actions.play()
    } else {
      actions.pause()
    }
  },

  stop () {
    state.view = 'idle'
    state.timer = 0
    port.postMessage(['stop'])
  },

  changeVolume (event) {
    state.volume = event.target.value
    port.postMessage(['changeVolume', state.volume])
  },

  changePitch (event) {
    state.beatsPitch = event.target.value
    console.log(state.beatsPitch)
    port.postMessage(['changePitch', state.beatsPitch])
  },

  selectMode (event) {
    state.mode = event.target.value
    port.postMessage(['changeMode', state.mode])
  },

  selectNoise (event) {
    state.noiseColor = event.target.value
    port.postMessage(['changeNoise', state.noiseColor])
  },

  selectBeats (event) {
    state.beatsPattern = event.target.value
    port.postMessage(['changeBeats', state.beatsPattern])
  },

  async openSpotify () {
    state.token = await Spotify.auth()
    m.redraw() // force redraw
    port.postMessage(['authSpotify', state.token])
  }
}

let state = null
port.onMessage.addListener(message => {
  const [msgtype, ...msgdata] = message
  if (msgtype === 'state') {
    state = msgdata[0]
    m.mount(document.body, {
      view: () => views[state.view]
        ? views[state.view](state, actions)
        : 'not found'
    })
  } else if (msgtype === 'pulse') {
    actions.pulse(msgdata[0])
  }
})
