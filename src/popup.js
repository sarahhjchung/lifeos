import m from 'mithril'

const state = {
  page: 'initial',
  time: 0,
  pause: false,
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

const gotoPage = (page) => {
  state.page = page
}

const togglePause = () => {
  state.pause = !state.pause
}

const pages = {
  initial () {
    return m('main', [
      m('h1', {class: "title"}, 'LifeOS'),
      m('h3', {class: "message"}, 'How long would you like to work?'),
      m('button', {class: "start button", onclick: () => gotoPage('playing') }, 'Start >')
    ])
  },
  playing () {
    return m('main', [
      m('h1', 'Playing state'),
      m('button', { onclick: togglePause }, 'Pause'),
      m('button', { onclick: () => gotoPage('initial') }, 'Stop')
    ])
  },
  complete () {
    return m('main', [
      m('h1', 'Complete state'),
      m('button', 'Snooze'),
      m('button', { onclick: () => gotoPage('initial') }, 'Ok')
    ])
  }
}

m.mount(document.body, popup)
