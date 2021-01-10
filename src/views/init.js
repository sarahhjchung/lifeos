import m from 'mithril'

// Init view (previously "initial state")
export default (state, actions) =>
  m('main', [
    m('h1', { class: 'title' }, 'LifeOS'),
    m('h3', { class: 'message' }, 'How long would you like to work?'),
    m('button', { class: 'start button', onclick: actions.start }, 'Start >')
  ])
