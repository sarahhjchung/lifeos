// create web audio api context
const context = new window.AudioContext()

// current Hz
let hz = 300

export function setHz (e) {
  hz = e
}

let pattern = 3

export function setPattern (e) {
  if (e === 'delta') {
    pattern = 3
  } else if (e === 'theta') {
    pattern = 7
  } else if (e === 'alpha') {
    pattern = 12
  } else if (e === 'beta') {
    pattern = 28
  } else if (e === 'gamma') {
    pattern = 48
  }
}

const splitter = context.createChannelSplitter(2)
const merger = context.createChannelMerger(2)
const left = context.createOscillator()
left.type = 'square'

const splitter2 = context.createChannelSplitter(2)
const merger2 = context.createChannelMerger(2)
const right = context.createOscillator()
right.type = 'square'

left.start()
right.start()

export function playBeats () {
  left.frequency.setValueAtTime(hz, context.currentTime)
  left.connect(splitter)
  splitter.connect(merger, 0, 1)

  right.frequency.setValueAtTime(hz + pattern, context.currentTime)
  right.connect(splitter2)
  splitter2.connect(merger2, 0, 0)

  merger.connect(context.destination)
  merger2.connect(context.destination)
}

export function stopBeats () {
  merger.disconnect(context.destination)
  merger2.disconnect(context.destination)
}
