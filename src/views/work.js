import m from 'mithril'
import { fromSeconds as hhmmss } from '../lib/hummus'

// Work view (previously "playing state")
export default (state, actions) =>
  m('main', [
    m('h1', { class: 'title' }, 'Working...'),
    m('div', { class: 'circles' }, [
      m('label', { for: 'timer-hours', class: 'circle -hours' }, [
        m('h2', { id: 'timer-hours' })
      ]),
      m('label', { for: 'timer-minutes', class: 'circle -minutes' }, [
        m('h2', { id: 'timer-minutes' })
      ]),
      m('label', { for: 'timer-seconds', class: 'circle -seconds' }, [
        m('h2', { id: 'timer-seconds' })
      ])
    ]),
    m('button', {
      class: 'sound-buttons replay',
      onclick: actions.stop,
      disabled: !state.paused ? 'disabled' : null
    }, m('span', { class: 'material-icons-round' }, 'replay')),
    m('button', { class: 'sound-buttons pause-play', onclick: actions.toggleAudio },
      state.paused
        ? m('span', { class: 'material-icons-round' }, 'play_arrow')
        : m('span', { class: 'material-icons-round' }, 'pause')),
    m('div', { class: 'volume' }, [
      m('span', { class: 'material-icons-round' }, 'volume_up'),
      m('input', { class: 'volume-slider', type: 'range', min: 0, max: 100, onchange: actions.changeVolume })
    ]),
    m('div', { class: 'mode-wrapper' },
      m('select', { class: 'mode', onchange: actions.selectMode }, [
        m('option', { value: 'none' }, 'No sound'),
        m('option', { value: 'mood' }, 'Mood'),
        m('option', { value: 'noise' }, 'Noise'),
        m('option', { value: 'beats' }, 'Binaural beats'),
        m('option', { value: 'spotify' }, 'Spotify')
      ])
    ),
    state.mode === 'mood'
      ? m('div', { class: 'noise-div' }, [
          m('select', { class: 'noise-mode', onchange: actions.selectMood }, [
            m('option', { class: 'noise-type', value: 'rain' }, 'Rain'),
            m('option', { class: 'noise-type', value: 'water' }, 'Underwater'),
            m('option', { class: 'noise-type', value: 'forest' }, 'Forest'),
            m('option', { class: 'noise-type', value: 'street' }, 'Street')
          ])])
      : null,
    state.mode === 'noise'
      ? m('div', { class: 'noise-div' }, [
          m('select', { class: 'noise-mode', onchange: actions.selectNoise }, [
            m('option', { class: 'noise-type', value: 'brown' }, 'Brown'),
            m('option', { class: 'noise-type', value: 'pink' }, 'Pink'),
            m('option', { class: 'noise-type', value: 'white' }, 'White')
          ])])
      : null,
    state.mode === 'beats'
      ? m('div', { class: 'beats-settings' }, [
          m('div', { class: 'pitch' }, [
            m('span', { class: 'material-icons-round music-note' }, 'music_note'),
            m('span', { class: 'pitch-hz' }, state.beatsPitch + 'Hz'),
            m('input', { class: 'pitch-slider', type: 'range', min: 100, max: 500, onchange: actions.changeHz })
          ]),
          m('select', { class: 'beats-mode', onchange: actions.selectBeats }, [
            m('option', { value: 'delta' }, 'Delta'),
            m('option', { value: 'theta' }, 'Theta'),
            m('option', { value: 'alpha' }, 'Alpha'),
            m('option', { value: 'beta' }, 'Beta'),
            m('option', { value: 'gamma' }, 'Gamma')
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
