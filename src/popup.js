import m from 'mithril'

let page = 'initial'
let time = 0 // in seconds
let pause = false
let noiseColor = 'white'
let beatsPitch = 200
let beatsPattern = 'beta'

const pages = {
  initial () {
    return m('main', [
      m('h1', 'Initial state'),
      m('button', { onclick: () => (page = 'playing') }, 'Start')
    ])
  },
  playing () {
    return m('main', [
      m('h1', 'Playing state'),
      m('button', { onclick: () => (pause = !pause) },
        pause ? 'Play' : 'Pause'),
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
