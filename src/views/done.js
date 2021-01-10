import m from 'mithril'

// Done view (previously "complete state")
export default (state, actions) =>
  m('main', [
    m('h1', 'Complete state'),
    m('button', 'Snooze'),
    m('button', { onclick: () => actions.stop() }, 'Ok')
  ])
