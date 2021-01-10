import * as Noise from './lib/noise'
import * as Beats from './lib/beats'
import * as Ambience from './lib/ambience'
import * as Spotify from './lib/spotify'

let port = null

const state = {
  view: 'idle',
  mode: 'none',
  timer: 0,
  heartbeat: null,
  alarm: null,
  paused: true,
  volume: 50,
  noiseColor: 'brown',
  beatsPitch: 200,
  beatsPattern: 'alpha',
  ambience: 'rain',
  songTitle: 'Song Title',
  songArtist: 'Artist',
  songAlbum: 'Album',
  songImage: null,
  songProgress: 0,
  songDuration: 0,
  token: null
}

const actions = {
  start (ticks) {
    state.view = 'work'
    state.timer = ticks
    actions.play()
  },

  play () {
    state.paused = false
    actions.playAudio()
    actions.queueHeartbeat()
    chrome.alarms.create({ when: Date.now() + state.timer * 1000 })
  },

  pause () {
    state.paused = true
    actions.stopAudio()
    actions.clearHeartbeat()
    chrome.alarms.get(alarm => {
      const ticks = Math.floor((alarm.scheduledTime - Date.now()) / 1000)
      state.timer = ticks
    })
    chrome.alarms.clear()
  },

  stop () {
    state.view = 'idle'
    chrome.alarms.clear()
  },

  pulse () {
    if (state.token) actions.updateSong()
    try {
      port.postMessage(['pulse', state.song])
      state.heartbeat = null
      actions.queueHeartbeat()
    } catch (err) {
      actions.clearHeartbeat()
    }
  },

  queueHeartbeat () {
    if (state.heartbeat) return
    state.heartbeat = setTimeout(actions.pulse, 1000)
  },

  clearHeartbeat () {
    if (!state.heartbeat) return
    clearTimeout(state.heartbeat)
    state.heartbeat = null
  },

  playAudio () {
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
    } else if (state.mode === 'ambience') {
      if (state.ambience === 'rain') {
        Ambience.playRain()
      } else if (state.ambience === 'water') {
        Ambience.playWater()
      } else if (state.ambience === 'forest') {
        Ambience.playForest()
      } else if (state.ambience === 'street') {
        Ambience.playStreet()
      }
    } else if (state.mode === 'spotify' && state.token) {
      actions.playSpotify()
    }
  },

  stopAudio () {
    if (state.mode === 'noise') {
      Noise.stop()
    } else if (state.mode === 'beats') {
      Beats.stopBeats()
    } else if (state.mode === 'ambience') {
      Ambience.stop()
    } else if (state.mode === 'spotify' && state.token) {
      Spotify.pause()
    }
  },

  changeVolume (volume) {
    state.volume = volume
    Noise.setVolume(volume)
    Beats.setVolume(volume)
    Ambience.setVolume(volume)
    actions.stopAudio()
    actions.playAudio()
  },

  changePitch (pitch) {
    state.beatsPitch = pitch
    Beats.setHz(pitch)
    actions.stopAudio()
    actions.playAudio()
  },

  changeMode (mode) {
    if (state.mode !== 'beats') {
      actions.stopAudio()
    } else if (!state.paused) {
      actions.stopAudio()
    }
    state.mode = mode
    actions.playAudio()
  },

  changeNoise (color) {
    actions.stopAudio()
    state.noiseColor = color
    actions.playAudio()
  },

  changeBeats (pattern) {
    actions.stopAudio()
    Beats.setPattern(pattern)
    actions.playAudio()
  },

  changeAmbience (ambience) {
    actions.stopAudio()
    state.ambience = ambience
    actions.playAudio()
  },

  async authSpotify (token) {
    state.token = token
    Spotify.use(token)

    let data = null
    try {
      data = await Spotify.getRecents()
      console.log(data)
    } catch (err) {
      console.log(err)
    }

    let item = null
    if (data) {
      item = data.items.find(item => item.context && item.context.uri)
    }

    if (!item) {
      return
    }

    console.log(item)
    actions.playSpotify({ context_uri: item.context.uri })
  },

  async playSpotify (params) {
    try {
      await Spotify.play(params)
      await actions.updateSong()
    } catch (err) {
      console.log(err)
    }
  },

  async updateSong () {
    const player = await Spotify.getPlayback()
    if (!player || !player.item) return
    state.song = {
      title: player.item.name,
      album: player.item.album.name,
      artist: player.item.artists
        .map(artist => artist.name).join(', '),
      image: player.item.album.images[0].url,
      progress: Math.floor(player.progress_ms / 1000),
      duration: Math.floor(player.item.duration_ms / 1000)
    }
  }
}

chrome.runtime.onInstalled.addListener(() => {
  // clear old alarm if existent (for debugging)
  chrome.alarms.clear()
  chrome.runtime.onConnect.addListener(p => {
    port = p

    if (state.view === 'work' && !state.paused) {
      chrome.alarms.get(alarm => {
        const ticks = Math.floor((alarm.scheduledTime - Date.now()) / 1000)
        state.timer = ticks
        cb()
      })
    } else {
      cb()
    }

    function cb () {
      actions.queueHeartbeat()

      port.postMessage(['state', state])

      port.onMessage.addListener(message => {
        const [msgtype, ...msgdata] = message
        if (actions[msgtype]) {
          actions[msgtype](...msgdata)
        }
      })

      port.onDisconnect.addListener(() => {
        actions.clearHeartbeat()
      })
    }
  })
})
