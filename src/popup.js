import m from 'mithril'
import * as Noise from './lib/noise'
import * as Spotify from './lib/spotify'
import * as Beats from './lib/beats'
import init from './views/init'
import work from './views/work'
import done from './views/done'

const views = { init, work, done }

const state = {
  view: 'init',
  mode: 'none',
  timer: 0, // in seconds
  paused: true,
  noiseColor: 'brown',
  beatsPitch: 200,
  beatsPattern: 'beta',
  songTitle: 'Song Title',
  songArtist: 'Artist',
  songAlbum: 'Album',
  songPosition: 0,
  songLength: 0
}

const actions = {
  start () {
    state.view = 'work'
    actions.play()
  },

  play () {
    state.paused = false
    actions.playAudio()
  },

  stop () {
    state.view = 'init'
    state.paused = true
    actions.stopAudio()
  },

  playAudio () {
    state.paused = false
    if (state.mode === 'noise') {
      if (state.noiseColor === 'white') {
        Noise.playWhite()
      } else if (state.noiseColor === 'pink') {
        Noise.playPink()
      } else if (state.noiseColor === 'brown') {
        Noise.playBrown()
      }
    } else if (state.mode === 'beats') {
      Beats.playBeats()
    }
  },

  stopAudio () {
    state.paused = true
    if (state.mode === 'noise') {
      Noise.stop()
    }
  },

  toggleAudio () {
    state.paused = !state.paused
    if (state.paused) {
      actions.stopAudio()
    } else {
      actions.playAudio()
    }
  },

  selectMode (event) {
    state.mode = event.target.value
    actions.playAudio()
  },

  selectNoise (event) {
    actions.stopAudio()
    state.noiseColor = event.target.value
    actions.play()
  },

  async openSpotify () {
    state.token = await Spotify.auth()
  }
}

m.mount(document.body, {
  view: () => views[state.view]
    ? views[state.view](state, actions)
    : 'not found'
})
