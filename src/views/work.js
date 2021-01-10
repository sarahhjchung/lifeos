import m from 'mithril'

// Work view (previously "playing state")
export default (state, actions) =>
  m('main', [
    m('h1', 'Working...'),
    m('button', {
      onclick: actions.stop,
      disabled: !state.paused ? 'disabled' : null
    }, m('span', { class: 'material-icons-round' }, 'replay')),
    m('button', { onclick: actions.toggleAudio },
      state.paused
        ? m('span', { class: 'material-icons-round' }, 'play')
        : m('span', { class: 'material-icons-round' }, 'pause')),
    m('div', { class: 'volume' }, [
      m('span', { class: 'material-icons-round' }, 'volume_up'),
      m('input', { type: 'range', min: 0, max: 100 })
    ]),
    m('select', { onchange: actions.selectMode }, [
      m('option', { value: 'none' }, 'No sound'),
      m('option', { value: 'noise' }, 'Noise'),
      m('option', { value: 'beats' }, 'Binaural beats'),
      m('option', { value: 'spotify' }, 'Your spotify playlist')
    ]),
    state.mode === 'spotify'
      ? m('button', { onclick: actions.openSpotify }, 'Log in with Spotify')
      : null
  ])
