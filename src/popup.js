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
  timeout: null,
  paused: true,
  volume: 30,
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

  update () {
    if (--state.timer < 0) {
      state.timer = 0
    }

    // HACK: using songImage to determine if song exists
    // TODO: song as substate e.g. state.song
    if (state.songImage && ++state.songProgress > state.songDuration) {
      state.songProgress = state.songDuration
    }

    console.log(state.songProgress)
    m.redraw()
  },

  queueUpdate () {
    state.timeout = setTimeout(actions.update, 1000)
  },

  cancelUpdate () {
    // TODO: higher precision
    if (state.timeout) {
      clearTimeout(state.timeout)
      state.timeout = null
    }
  },

  changeVolume (event) {
    state.volume = event.target.value
    // Noise.volume(event.target.value)
  },

  playAudio () {
    state.paused = false
    actions.queueUpdate()

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
      actions.playSpotify()
    }
  },

  async playSpotify (params) {
    try {
      await Spotify.play(params)
      await actions.updateSong()
    } catch (err) {
      console.log(err)
    }
  },

  stopAudio () {
    state.paused = true
    actions.cancelUpdate()
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

    await actions.playSpotify({ context_uri: item.context.uri })
  },

  async updateSong () {
    const song = await Spotify.getSong()
    if (song && song.item) {
      state.songTitle = song.item.name
      state.songAlbum = song.item.album.name
      state.songArtist = song.item.artists
        .map(artist => artist.name).join(', ')
      state.songImage = song.item.album.images[0].url
      state.songProgress = Math.floor(song.progress_ms / 1000)
      state.songDuration = Math.floor(song.item.duration_ms / 1000)
    }
  }
}

m.mount(document.body, {
  view: () => views[state.view]
    ? views[state.view](state, actions)
    : 'not found'
})

actions.queueUpdate()
