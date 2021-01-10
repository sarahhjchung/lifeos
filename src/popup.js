import m from 'mithril'
import { play as playNoise, stop as stopNoise } from './lib/noise'
import init from './views/init'
import work from './views/work'
import done from './views/done'

const views = { init, work, done }

const state = {
  view: 'init',
  mode: 'none',
  timer: 0, // in seconds
  playing: false,
  noiseColor: 'white',
  beatsPitch: 200,
  beatsPattern: 'beta'
}

const actions = {
  start () {
    state.view = 'work'
    actions.play()
  },

  play () {
    state.playing = true
    playNoise()
  },

  stop () {
    state.view = 'init'
    state.playing = false
    stopNoise()
  },

  toggle () {
    state.playing = !state.playing
    if (state.playing) {
      playNoise()
    } else {
      stopNoise()
    }
  }
}

m.mount(document.body, {
  view: () => views[state.view]
    ? views[state.view](state, actions)
    : 'not found'
})
