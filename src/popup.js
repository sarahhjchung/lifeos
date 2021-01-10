import m from 'mithril'
import { play as playNoise, stop as stopNoise } from './noise'
import openSpotify from './spotify'

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
}

function play () {
  playing = true
  playNoise()
}

function toggle () {
  playing = !playing
  if (playing) {
    playNoise()
  } else {
    stopNoise()
  }
}

const pages = {
  initial () {
    return m('main', [
      m('h1', 'Initial state'),
      m('button', { onclick: () => start() }, 'Start')
    ])
  },
  playing () {
    return m('main', [
      m('h1', 'Playing state'),
      m('button', { onclick: () => toggle() },
        playing ? 'Pause' : 'Play'),
      m('button', { onclick: () => openSpotify() }, 'Log in with Spotify'),
      m('button', {
        onclick: () => stop(),
        disabled: playing ? 'disabled' : null
      }, 'Stop')
    ])
  },
  complete () {
    return m('main', [
      m('h1', 'Complete state'),
      m('button', 'Snooze'),
      m('button', { onclick: () => stop() }, 'Ok')
    ])
  }
}

const popup = {
  view () {
    if (pages[page]) {
      return pages[page]()
    }
  }
}

m.mount(document.body, popup)
