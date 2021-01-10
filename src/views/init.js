import m from 'mithril'

// Init view (previously "initial state")
export default (state, actions) =>
  m('main', [
    m('h1', { class: 'title' }, 'LifeOS'),
    m('h3', { class: 'message' }, 'How long would you like to work?'),
    m('div', { class: 'circles' }, [
      m('label', { for: 'hours', class: 'circle -hours' }, [
        m('input', { type: 'number', min: '0', max: '59', id: 'hours', class: 'circle-input', placeholder: '00' })
      ]),
      m('label', { for: 'minutes', class: 'circle -minutes' }, [
        m('input', { type: 'number', min: '0', max: '59', id: 'minutes', class: 'circle-input', placeholder: '00' })
      ]),
      m('label', { for: 'seconds', class: 'circle -seconds' }, [
        m('input', { type: 'number', min: '0', max: '59', id: 'seconds', class: 'circle-input', placeholder: '00' })
      ])
    ]),
    m('div', { class: 'center-button' }, [
      m('button', { class: 'start button', onclick: actions.start }, 'Start >')
    ])
  ])
