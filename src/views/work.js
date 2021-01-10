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
      m('label', { class: 'circle -hours' }, [
        m('h2', { class: 'circle-number' }, hours)
      ]),
      m('label', { class: 'circle -mins' }, [
        m('h2', { class: 'circle-number' }, mins)
      ]),
      m('label', { class: 'circle -secs' }, [
        m('h2', { class: 'circle-number' }, secs)
      ])
    ]),
    m('button', {
      class: 'sound-buttons replay',
      onclick: actions.stop,
      disabled: !state.paused ? 'disabled' : null
    }, m('span', { class: 'material-icons-round' }, 'stop')),
    m('button', { class: 'sound-buttons pause-play', onclick: actions.toggle },
      state.paused
        ? m('span', { class: 'material-icons-round' }, 'play_arrow')
        : m('span', { class: 'material-icons-round' }, 'pause')),
    m('div', { class: 'volume' }, [
      m('span', { class: 'material-icons-round' }, 'volume_up'),
      m('input', { class: 'volume-slider', type: 'range', min: 0, max: 100, defaultValue: state.volume, onchange: actions.changeVolume })
    ]),
    m('div', { class: 'mode-wrapper' },
      m('select', { class: 'mode', onchange: actions.selectMode }, [
        m('option', { value: 'none', selected: state.mode === 'none' }, 'No sound'),
        m('option', { value: 'noise', selected: state.mode === 'noise' }, 'Noise'),
        m('option', { value: 'beats', selected: state.mode === 'beats' }, 'Binaural beats'),
        m('option', { value: 'ambience', selected: state.mode === 'ambience' }, 'Ambience'),
        m('option', { value: 'spotify', selected: state.mode === 'spotify' }, 'Spotify')
      ])
    ),
    state.mode === 'noise'
      ? m('div', { class: 'noise-div' }, [
          m('select', { class: 'noise-mode', onchange: actions.selectNoise }, [
            m('option', { class: 'noise-type', value: 'brown', selected: state.noiseColor === 'brown' }, 'Brown'),
            m('option', { class: 'noise-type', value: 'pink', selected: state.noiseColor === 'pink' }, 'Pink'),
            m('option', { class: 'noise-type', value: 'white', selected: state.noiseColor === 'white' }, 'White')
          ])
        ])
      : null,
    state.mode === 'beats'
      ? m('div', { class: 'beats-settings' }, [
          m('div', { class: 'pitch' }, [
            m('span', { class: 'material-icons-round music-note' }, 'music_note'),
            m('span', { class: 'pitch-hz' }, state.beatsPitch + 'Hz'),
            m('input', {
              class: 'pitch-slider',
              type: 'range',
              min: 100,
              max: 500,
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
    state.mode === 'ambience'
      ? m('div', { class: 'noise-div' }, [
          m('select', { class: 'noise-mode', onchange: actions.selectAmbience }, [
            m('option', { class: 'noise-type', value: 'rain', selected: state.ambience === 'rain' }, 'Rain'),
            m('option', { class: 'noise-type', value: 'water', selected: state.ambience === 'water' }, 'Underwater'),
            m('option', { class: 'noise-type', value: 'forest', selected: state.ambience === 'forest' }, 'Forest'),
            m('option', { class: 'noise-type', value: 'street', selected: state.ambience === 'street' }, 'Street')
          ])])
      : null,
    state.mode === 'spotify'
      ? state.token
          ? m('div', { class: 'spotify-widget' }, [
              m('div', { class: 'widget-head' }, [
                m('div', { class: 'widget-lhs' }, [
                  state.song && state.song.image
                    ? m('img', { class: 'widget-image', src: state.song.image })
                    : m('div', { class: 'widget-image' }),
                  m('div', { class: 'widget-data' }, [
                    m('div', { class: 'song-title' },
                      state.song ? state.song.title : 'Song Name'),
                    m('span', { class: 'song-meta' },
                      m('span', { class: 'song-artist' },
                        state.song ? state.song.artist : 'Artist'),
                      ' - ',
                      m('span', { class: 'song-album' },
                        state.song ? state.song.album : 'Album')
                    )
                  ])
                ]),
                m('div', { class: 'widget-rhs widget-buttons' }, [
                  m('button', { class: 'widget-prev material-icons-round', onclick: actions.prevSong }, 'skip_previous'),
                  m('button', { class: 'widget-next material-icons-round', onclick: actions.nextSong }, 'skip_next')
                ])
              ]),
              m('div', { class: 'widget-seek' }, [
                m('input', {
                  class: 'widget-slider',
                  type: 'range',
                  min: 0,
                  max: state.song && state.song.duration,
                  value: state.song && state.song.progress,
                  disabled: !state.song
                }),
                m('div', { class: 'widget-times' }, [
                  m('div', { class: 'song-position' }, fromSeconds(state.song ? state.song.progress : 0)),
                  m('div', { class: 'song-length' }, fromSeconds(state.song ? state.song.duration : 0))
                ])
              ])
            ])
          : m('button', { class: 'spotify-log-in', onclick: actions.openSpotify }, 'Log in with Spotify')
      : null,
    m('div', { class: 'bg' }, [
      m('img', { src: '../assets/wave-dark.svg', class: 'bg-wave -dark' }),
      m('img', { src: '../assets/wave-light.svg', class: 'bg-wave -light' })
    ])
  ])
}
