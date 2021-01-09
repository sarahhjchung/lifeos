import m from 'mithril'

const state = {
  page: 'initial',
  time: 0,
  paused: false,
  noise: {
    color: 'white'
  },
  beats: {
    pitch: 200,
    pattern: 'beta'
  },
  spotify: {}
}

m.render(document.body, 'Hello world!')
