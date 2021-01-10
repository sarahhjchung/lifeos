import m from 'mithril'

const messages = ['Remember to stay hydrated!', 'Take a moment to stand up and stretch.', 'Rest your eyes!', 'Go outside and touch some grass']

function chooseMsg (msg) {
  return msg[Math.floor(Math.random() * messages.length)]
}

// Done view (previously "complete state")
export default (state, actions) =>
  m('main', [
    m('h1', { class: 'title' }, 'Time\'s up!'),
    m('h3', { class: 'message' }, chooseMsg(messages)),
    m('button', 'Snooze'),
    m('button', { onclick: () => actions.stop() }, 'Ok')
  ])
