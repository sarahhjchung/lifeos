import m from 'mithril'

// Work view (previously "playing state")
export default (state, actions) =>
  m('main', [
    m('h1', 'Working...'),
    m('button', { onclick: () => actions.toggle() },
      state.paused ? 'Play' : 'Pause'),
    m('select', [
      m('option', { value: 'none' }, 'No sound'),
      m('option', { value: 'noise' }, 'Noise'),
      m('option', { value: 'beats' }, 'Binaural beats'),
      m('option', { value: 'spotify' }, 'Your spotify playlist')
    ]),
    m('button', { onclick: () => actions.openSpotify() }, 'Log in with Spotify'),
    m('button', {
      onclick: () => actions.stop(),
      disabled: !state.paused ? 'disabled' : null
    }, 'Stop')
  ])
