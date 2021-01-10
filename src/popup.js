import m from 'mithril'
<<<<<<< HEAD
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
=======
import { play as playNoise, stop as stopNoise } from './noise'
import openSpotify from './spotify'
import playBeats from './beats'

let page = 'initial'
let time = 0 // in seconds
let playing = false
let noiseColor = 'white'
let beatsPitch = 200
let beatsPattern = 'beta'

function start () {
  page = 'playing'
  play()
}

function stop () {
  page = 'initial'
  playing = false
  stopNoise()
>>>>>>> master
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
<<<<<<< HEAD

  stop () {
    state.view = 'init'
    state.playing = false
    stopNoise()
=======
  playing () {
    return m('main', [
      m('h1', 'Working...'),
      m('button', { onclick: () => toggle() },
        playing ? 'Pause' : 'Play'),
      m('button', { onclick: () => openSpotify() }, 'Log in with Spotify'),
      m('button', { onclick: () => playBeats() }, 'Play Binaural Beats'),
      m('button', {
        onclick: () => stop(),
        disabled: playing ? 'disabled' : null
      }, 'Stop')
    ])
>>>>>>> master
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
