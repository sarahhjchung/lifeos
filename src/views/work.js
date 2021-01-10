import m from 'mithril'
import { fromSeconds } from '../lib/hummus'

// Work view (previously "playing state")
export default (state, actions) => {
  let model = fromSeconds(state.timer)
  if (model.length === 4) model = '0' + model
  if (model.length === 5) model = '00:' + model
  const [hours, mins, secs] = model.split(':')
  return m('main', [
    m('h1', { class: 'title' }, 'Working...'),
    m('div', { class: 'circles' }, [
      m('label', { for: 'hours', class: 'circle -hours' }, [
        m('span', { class: 'circle-label' }, hours)
      ]),
      m('label', { for: 'mins', class: 'circle -mins' }, [
        m('span', { class: 'circle-label' }, mins)
      ]),
      m('label', { for: 'secs', class: 'circle -secs' }, [
        m('span', { class: 'circle-label' }, secs)
      ])
    ]),
    m('button', {
      class: 'sound-buttons replay',
      onclick: actions.stop,
      disabled: !state.paused ? 'disabled' : null
    }, m('span', { class: 'material-icons-round' }, 'replay')),
    m('button', { class: 'sound-buttons pause-play', onclick: actions.toggle },
      state.paused
        ? m('span', { class: 'material-icons-round' }, 'play_arrow')
        : m('span', { class: 'material-icons-round' }, 'pause')),
    m('div', { class: 'volume' }, [
      m('span', { class: 'material-icons-round' }, 'volume_up'),
      m('input', { class: 'volume-slider', type: 'range', min: 0, max: 100, onchange: actions.changeVolume })
    ]),
    m('div', { class: 'mode-wrapper' },
      m('select', { class: 'mode', onchange: actions.selectMode }, [
        m('option', { value: 'none', selected: state.mode === 'none' }, 'No sound'),
        m('option', { value: 'noise', selected: state.mode === 'noise' }, 'Noise'),
        m('option', { value: 'beats', selected: state.mode === 'beats' }, 'Binaural beats'),
        m('option', { value: 'spotify', selected: state.mode === 'spotify' }, 'Spotify')
      ])
    ),
    state.mode === 'noise'
      ? m('select', { class: 'noise-mode', onchange: actions.selectNoise }, [
          m('option', { class: 'noise-type', value: 'brown', selected: state.noiseColor === 'brown' }, 'Brown'),
          m('option', { class: 'noise-type', value: 'pink', selected: state.noiseColor === 'pink' }, 'Pink'),
          m('option', { class: 'noise-type', value: 'white', selected: state.noiseColor === 'white' }, 'White')
        ])
      : null,
    state.mode === 'beats'
      ? m('div', { class: 'beats-settings' }, [
          m('div', { class: 'pitch' }, [
            m('span', { class: 'material-icons-round' }, 'music_note'),
            m('span', { class: 'pitch-hz' }, state.beatsPitch + 'Hz'),
            m('input', {
              class: 'pitch-slider',
              type: 'range',
              min: 5,
              max: 1000,
              value: state.beatsPitch,
              onchange: actions.changePitch
            })
          ]),
          m('select', { class: 'beats-mode', onchange: actions.selectBeats }, [
            m('option', { value: 'delta', selected: state.beatsPattern === 'delta' }, 'Delta'),
            m('option', { value: 'theta', selected: state.beatsPattern === 'theta' }, 'Theta'),
            m('option', { value: 'alpha', selected: state.beatsPattern === 'alpha' }, 'Alpha'),
            m('option', { value: 'beta', selected: state.beatsPattern === 'beta' }, 'Beta'),
            m('option', { value: 'gamma', selected: state.beatsPattern === 'gamma' }, 'Gamma')
          ])
        ])
      : null,
    state.mode === 'spotify'
      ? state.token
          ? m('div', { class: 'spotify-widget' }, [
              m('div', { class: 'widget-head' }, [
                m('div', { class: 'widget-lhs' }, [
                  state.songImage
                    ? m('img', { class: 'widget-image', src: state.songImage })
                    : m('div', { class: 'widget-image' }),
                  m('div', { class: 'widget-data' }, [
                    m('div', { class: 'song-title' }, state.songTitle),
                    m('span', { class: 'song-meta' },
                      m('span', { class: 'song-artist' }, state.songArtist),
                      ' - ',
                      m('span', { class: 'song-album' }, state.songAlbum)
                    )
                  ])
                ]),
                m('div', { class: 'widget-rhs widget-buttons' }, [
                  m('button', { class: 'material-icons-round' }, 'skip_previous'),
                  m('button', { class: 'material-icons-round' }, 'skip_next')
                ])
              ]),
              m('div', { class: 'widget-seek' }, [
                m('input', {
                  class: 'widget-slider',
                  type: 'range',
                  min: 0,
                  max: state.songDuration,
                  value: state.songProgress
                }),
                m('div', { class: 'widget-times' }, [
                  m('div', { class: 'song-position' }, hhmmss(state.songProgress)),
                  m('div', { class: 'song-length' }, hhmmss(state.songDuration))
                ])
              ])
            ])
          : m('button', { class: 'spotify-log-in', onclick: actions.openSpotify }, 'Log in with Spotify')
      : null
  ])
}
