import m from 'mithril'
import toggleNoise from './noise'

let page = 'initial'
let time = 0 // in seconds
let play = false
let noiseColor = 'white'
let beatsPitch = 200
let beatsPattern = 'beta'

function start () {
  page = 'playing'
  toggle()
}

function toggle () {
  play = !play
  toggleNoise()
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
        play ? 'Pause' : 'Play'),
      m('button', { onclick: () => (page = 'initial') }, 'Stop')
    ])
  },
  complete () {
    return m('main', [
      m('h1', 'Complete state'),
      m('button', 'Snooze'),
      m('button', { onclick: () => (page = 'initial') }, 'Ok')
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
