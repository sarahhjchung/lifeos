import m from 'mithril'

const messages = ['Remember to stay hydrated!', 'Take a moment to stand up and stretch.', 'Rest your eyes!', 'Go outside and touch some grass.', 'Organize your space!']

function chooseMsg (msg) {
  return msg[Math.floor(Math.random() * messages.length)]
}

// Done view (previously "complete state")
export default (state, actions) =>
  m('main', [
    m('h1', { class: 'title' }, 'Time\'s up!'),
    m('h3', { class: 'message' }, chooseMsg(messages)),
    m('div', { class: 'circles' }, [
      m('label', { for: 'timer-hours', class: 'circle -hours' }, [
        m('h2', { id: 'timer-hours' }, '00')
      ]),
      m('label', { for: 'timer-minutes', class: 'circle -minutes' }, [
        m('h2', { id: 'timer-minutes' }, '00')
      ]),
      m('label', { for: 'timer-seconds', class: 'circle -seconds' }, [
        m('h2', { id: 'timer-seconds' }, '00')
      ])
    ]),
    m('div', { class: 'done-buttons' }, [
      m('button', { class: 'snooze-button' }, 'Snooze'),
      m('button', { class: 'ok-button', onclick: actions.stop }, 'Ok')
    ])
  ])
