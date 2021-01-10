// create web audio api context
const context = new window.AudioContext()
let volume = 0.5

export function setVolume (v) {
  volume = v / 100
}

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
const leftGainNode = context.createGain()
left.type = 'square'

const splitter2 = context.createChannelSplitter(2)
const merger2 = context.createChannelMerger(2)
const right = context.createOscillator()
const rightGainNode = context.createGain()
right.type = 'square'

left.start()
right.start()

export function playBeats () {
  left.frequency.setValueAtTime(hz, context.currentTime)
  left.connect(splitter)
  splitter.connect(merger, 0, 1)
  merger.connect(leftGainNode)
  leftGainNode.connect(context.destination)
  leftGainNode.gain.setValueAtTime(volume, context.currentTime)

  right.frequency.setValueAtTime(hz + pattern, context.currentTime)
  right.connect(splitter2)
  splitter2.connect(merger2, 0, 0)
  merger2.connect(rightGainNode)
  rightGainNode.connect(context.destination)
  rightGainNode.gain.setValueAtTime(volume, context.currentTime)
}

export function stopBeats () {
  leftGainNode.disconnect(context.destination)
  rightGainNode.disconnect(context.destination)
}
