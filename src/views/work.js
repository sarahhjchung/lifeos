import m from 'mithril'

export default (state, actions) =>
  m('main', [
    m('h1', 'Working...'),
    m('button', { onclick: () => actions.toggle() },
      state.playing ? 'Pause' : 'Play'),
    m('button', { onclick: () => actions.openSpotify() }, 'Log in with Spotify'),
    m('button', { }, 'Play Binaural Beats'),
    m('button', {
      onclick: () => actions.stop(),
      disabled: state.playing ? 'disabled' : null
    }, 'Stop')
  ])
