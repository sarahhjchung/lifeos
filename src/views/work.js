import m from 'mithril'

// Work view (previously "playing state")
export default (state, actions) =>
  m('main', [
    m('h1', 'Working...'),
    m('button', { onclick: () => actions.toggle() },
      state.paused ? 'Play' : 'Pause'),
    m('button', { onclick: () => actions.openSpotify() }, 'Log in with Spotify'),
    m('button', { }, 'Play Binaural Beats'),
    m('button', {
      onclick: () => actions.stop(),
      disabled: !state.paused ? 'disabled' : null
    }, 'Stop')
  ])
