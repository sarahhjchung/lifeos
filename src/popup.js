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
  beatsPattern: 'alpha',
  songTitle: 'Song Title',
  songArtist: 'Artist',
  songAlbum: 'Album',
  songImage: null,
  songProgress: 0,
  songDuration: 0
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
    } else if (state.mode === 'spotify' && state.token) {
      Spotify.play()
    }
  },

  stopAudio () {
    state.paused = true
    if (state.mode === 'noise') {
      Noise.stop()
    } else if (state.mode === 'beats') {
      Beats.stopBeats()
    } else if (state.mode === 'spotify' && state.token) {
      Spotify.pause()
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

  async selectMode (event) {
    actions.stopAudio()
    state.mode = event.target.value
    actions.playAudio()
  },

  selectNoise (event) {
    actions.stopAudio()
    state.noiseColor = event.target.value
    actions.playAudio()
  },

  selectBeats (event) {
    state.beatsPattern = event.target.value
    Beats.setPattern(event.target.value)
    actions.play()
  },

  async openSpotify () {
    state.token = await Spotify.auth()
    m.redraw() // force redraw

    const data = await Spotify.getRecents()
    console.log(data)

    const item = data.items.find(item => item.context && item.context.uri)
    if (!item) {
      return
    }

    try {
      await Spotify.play({ context_uri: item.context.uri })
    } catch (err) {
      console.log(err)
    }

    const song = await Spotify.getSong()
    state.songTitle = song.item.name
    state.songAlbum = song.item.album.name
    state.songArtist = song.item.artists
      .map(artist => artist.name).join(', ')
    state.songImage = song.item.album.images[0].url
    state.songProgress = Math.floor(song.progress_ms / 1000)
    state.songDuration = Math.floor(song.item.duration_ms / 1000)
  }
}

m.mount(document.body, {
  view: () => views[state.view]
    ? views[state.view](state, actions)
    : 'not found'
})
