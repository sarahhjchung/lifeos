import m from 'mithril'

const chrome = window.chrome // eslint prefix
const endpoint = 'https://accounts.spotify.com/authorize'
const clientId = '299a4acc53634bc286572df9b8e8d9e3'
const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state'
]
let token = null

function getURL (endpoint, clientId, scopes) {
  const redirectURL = chrome.identity.getRedirectURL('callback')
  return endpoint +
    '?client_id=' + clientId +
    '&scope=' + scopes.join('%20') +
    '&redirect_uri=' + redirectURL +
    '&response_type=token' +
    '&show_dialog=true'
}

export function open () {
  const req = getURL(endpoint, clientId, scopes)
  window.chrome.identity.launchWebAuthFlow({
    url: req,
    interactive: true
  }, (res) => {
    if (!res) return
    const startkey = '#access_token='
    const endkey = '&token_type'
    const start = res.lastIndexOf(startkey) + startkey.length
    const end = res.lastIndexOf(endkey)
    const token = res.slice(start, end)
    window.alert(token)
    m.request({
      url: 'https://api.spotify.com/v1/me',
      headers: { Authorization: 'Bearer ' + token }
    }).then(res => {
      window.alert(JSON.stringify(res))
    }).catch(err => {
      window.alert(JSON.stringify(err))
    })
  })
}
