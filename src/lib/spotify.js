import m from 'mithril'

const endpoint = 'https://accounts.spotify.com/authorize'
const clientId = '299a4acc53634bc286572df9b8e8d9e3'
const scopes = [
  'user-read-playback-position',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played'
]

// token cache
let token = null

function getURL (endpoint, clientId, scopes) {
  const redirectURL = window.chrome.identity.getRedirectURL('callback')
  return endpoint +
    '?client_id=' + clientId +
    '&scope=' + scopes.join('%20') +
    '&redirect_uri=' + redirectURL +
    '&response_type=token' +
    '&show_dialog=true'
}

export function auth () {
  return new Promise((resolve, reject) => {
    const url = getURL(endpoint, clientId, scopes)
    window.chrome.identity.launchWebAuthFlow({
      url,
      interactive: true
    }, res => {
      if (!res) {
        return reject(new Error('User authentication failed'))
      }
      const startkey = '#access_token='
      const endkey = '&token_type'
      const start = res.lastIndexOf(startkey) + startkey.length
      const end = res.lastIndexOf(endkey)
      token = res.slice(start, end)
      resolve(token)
    })
  })
}

export function play () {
  if (!token) return
  m.request({
    method: 'PUT',
    url: 'https://api.spotify.com/v1/me/player/play',
    headers: { Authorization: 'Bearer ' + token }
  })
}

export function pause () {
  if (!token) return
  m.request({
    method: 'PUT',
    url: 'https://api.spotify.com/v1/me/player/pause',
    headers: { Authorization: 'Bearer ' + token }
  })
}

export function getRecents () {
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject(new Error('Failed to retrieve recently played songs:' +
        'User is not authenticated'))
    }
    m.request({
      url: 'https://api.spotify.com/v1/me/player/recently-played',
      headers: { Authorization: 'Bearer ' + token }
    }).then(data => resolve(data))
  })
}
