import m from 'mithril'

const messages = ['Remember to stay hydrated!', 'Take a moment to stand up and stretch.', 'Rest your eyes!', 'Go outside and touch some grass.', 'Organize your space!']

function chooseMsg (msg) {
  return msg[Math.floor(Math.random() * messages.length)]
}

// Done view (previously "complete state")
export default (state, actions) =>
  m('main', { class: 'view -done' }, [
    m('h1', { class: 'title' }, 'Time\'s up!'),
    m('h3', { class: 'message' }, chooseMsg(messages)),
    m('div', { class: 'circles' }, [
      m('div', { class: 'circle -hours' }, [
        m('h2', { class: 'circle-number' }, '00')
      ]),
      m('div', { class: 'circle -mins' }, [
        m('h2', { class: 'circle-number' }, '00')
      ]),
      m('div', { class: 'circle -secs' }, [
        m('h2', { class: 'circle-number' }, '00')
      ])
    ]),
    m('div', { class: 'done-buttons' }, [
      m('button', { class: 'snooze-button' }, 'Snooze'),
      m('button', { class: 'ok-button', onclick: actions.stop }, 'Ok')
    ]),
    m('div', { class: 'bg' }, [
      m('img', { src: '../assets/wave-dark.svg', class: 'bg-wave -dark' }),
      m('img', { src: '../assets/wave-light.svg', class: 'bg-wave -light' })
    ])
  ])
