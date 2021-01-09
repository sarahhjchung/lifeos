import m from 'mithril'

const state = {
  page: 'initial',
  time: 0,
  paused: false,
  noise: {
    color: 'white'
  },
  beats: {
    pitch: 200,
    pattern: 'beta'
  },
  spotify: {}
}

const popup = {
  view () {
    const view = pages[state.page]
    if (view) {
      return view()
    }
  }
}

const pages = {
  initial () {
    return m('main', [
      m('h1', 'Initial state'),
      m('button', 'Start')
    ])
  },
  playing () {
    return m('main', [
      m('h1', 'Playing state'),
      m('button', 'Pause'),
      m('button', 'Stop')
    ])
  },
  complete () {
    return m('main', [
      m('h1', 'Complete state'),
      m('button', 'Snooze'),
      m('button', 'Ok')
    ])
  }
}

m.mount(document.body, popup)
