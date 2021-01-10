import clientId from './client.json'

const chrome = window.chrome // eslint prefix
const endpoint = 'https://accounts.spotify.com/authorize'
const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state'
]

function getURL (endpoint, clientId, scopes) {
  const redirectURL = chrome.identity.getRedirectURL('callback')
  return endpoint +
    '?client_id=' + clientId +
    '&scope=' + scopes.join('%20') +
    '&redirect_uri=' + redirectURL +
    '&response_type=token' +
    '&show_dialog=true'
}

export default function openSpotify () {
  const req = getURL(endpoint, clientId, scopes)
  window.chrome.identity.launchWebAuthFlow({
    url: req,
    interactive: true
  }, (res) => { if (res) alert(res) })
}
