import m from 'mithril'

// Init view (previously "initial state")
export default (state, actions) =>
  m('main', [
    m('h1', { class: 'title' }, 'LifeOS'),
    m('h3', { class: 'message' }, 'How long would you like to work?'),
    m('div', { class: 'circles' }, [
      m('label', { for: 'hours', class: 'circle -hours' }, [
        m('input', { type: 'number', min: '0', max: '59', id: 'hours', class: 'circle-number', placeholder: '00' })
      ]),
      m('label', { for: 'mins', class: 'circle -mins' }, [
        m('input', { type: 'number', min: '0', max: '59', id: 'mins', class: 'circle-number', placeholder: '00', value: '25' })
      ]),
      m('label', { for: 'secs', class: 'circle -secs' }, [
        m('input', { type: 'number', min: '0', max: '59', id: 'secs', class: 'circle-number', placeholder: '00' })
      ])
    ]),
    m('div', { class: 'center-button' }, [
      m('button', { class: 'start button', onclick: actions.start },
        ['Start', m('span', { class: 'material-icons-round' }, 'arrow_right')])
    ]),
    m('div', { class: 'bg' }, [
      m('img', { src: '../assets/wave-dark.svg', class: 'bg-wave -dark' }),
      m('img', { src: '../assets/wave-light.svg', class: 'bg-wave -light' })
    ])
  ])
