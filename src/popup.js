import m from 'mithril'
import idle from './views/idle'
import work from './views/work'
import done from './views/done'
import { toSeconds } from './lib/hummus.js'

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
    actions.queueTick()
  },
  tick () {
    if (--state.timer < 0) {
      state.timer = 0
    }
    m.redraw()
    state.alarm = null
    actions.queueTick()
  },
  queueTick () {
    if (state.alarm) return
    state.alarm = setTimeout(actions.tick, 1000)
  },
  clearTick () {
    if (!state.alarm) return
    clearTimeout(actions.tick)
    actions.tick = null
  },
  play () {
    state.paused = false
    actions.queueTick()
    port.postMessage(['play'])
  },
  pause () {
    state.paused = true
    actions.clearTick()
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
    state.ticks = 0
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
  }
})
