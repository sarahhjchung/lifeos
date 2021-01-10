import m from 'mithril'

// Init view (previously "initial state")
export default (state, actions) =>
  m('main', [
    m('h1', { class: 'title' }, 'LifeOS'),
    m('h3', { class: 'message' }, 'How long would you like to work?'),
    m('div', { class: 'circles' }, [
      m('span', { class: 'circles-dark' }),
      m('span', { class: 'circles-medium' }),
      m('span', { class: 'circles-light' })]), 
    m('input', { class: 'input -hours' }),
    m('input', { class: 'input -minutes' }),
    m('input', { class: 'input -seconds' }),
    m('button', { class: 'start button', onclick: actions.start }, 'Start >')
  ])
