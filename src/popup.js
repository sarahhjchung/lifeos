import m from 'mithril'
import * as Noise from './lib/noise'
import * as Spotify from './lib/spotify'
import init from './views/init'
import work from './views/work'
import done from './views/done'

const views = { init, work, done }

const state = {
  view: 'init',
  mode: 'none',
  timer: 0, // in seconds
  paused: true,
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
    state.paused = false
    actions.playAudio()
  },

  stop () {
    state.view = 'init'
    state.paused = true
    actions.stopAudio()
  },

  playAudio () {
    state.paused = false
    if (state.mode === 'noise') {
      Noise.play()
    }
  },

  stopAudio () {
    state.paused = true
    if (state.mode === 'noise') {
      Noise.stop()
    }
  },

  toggleAudio () {
    state.paused = !state.paused
    if (state.paused) {
      actions.stopAudio()
    } else {
      actions.playAudio()
    }
  },

  openSpotify () {
    Spotify.open()
  }
}

m.mount(document.body, {
  view: () => views[state.view]
    ? views[state.view](state, actions)
    : 'not found'
})
