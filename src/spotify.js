import clientId from './client.json'

const endpoint = 'https://accounts.spotify.com/authorize'
const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state'
]

const href = endpoint +
  '?client_id=' + clientId +
  '&scope=' + scopes.join('%20') +
  '&redirect_uri=http://localhost:8888/callback' +
  '&response_type=token' +
  '&show_dialog=true'

export default function openSpotify () {
  window.chrome.tabs.create({ url: href })
}
