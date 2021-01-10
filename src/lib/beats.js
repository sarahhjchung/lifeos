// create web audio api context
const context = new window.AudioContext()

// current Hz
let hz = 300

export function setHz (e) {
  hz = e
}

let pattern = 13

export function setPattern (e) {
  if (e === 'alpha') {
    pattern = 13
  } else if (e === 'beta') {
    pattern = 30
  } else if (e === 'gamma') {
    pattern = 50
  }
}

// left channel
const splitter = context.createChannelSplitter(2)
const merger = context.createChannelMerger(2)
const left = context.createOscillator()
left.type = 'square'
left.frequency.setValueAtTime(hz, context.currentTime)
left.connect(splitter)
splitter.connect(merger, 0, 1)

// right channel
const splitter2 = context.createChannelSplitter(2)
const merger2 = context.createChannelMerger(2)
const right = context.createOscillator()
right.type = 'square'
right.frequency.setValueAtTime(hz + pattern, context.currentTime)
right.connect(splitter2)
right.connect(merger2, 0, 0)

left.start()
right.start()

export function playBeats () {
  merger.connect(context.destination)
  merger2.connect(context.destination)
}

export function stopBeats () {
  merger.disconnect(context.destination)
  merger2.disconnect(context.destination)
}
