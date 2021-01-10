// create web audio api context
const context = new window.AudioContext()

// left channel
const splitter = context.createChannelSplitter(2)
const merger = context.createChannelMerger(2)
const left = context.createOscillator()
left.type = 'square'
left.frequency.setValueAtTime(440, context.currentTime)
left.connect(splitter)
splitter.connect(merger, 0, 1)

// right channel
const splitter2 = context.createChannelSplitter(2)
const merger2 = context.createChannelMerger(2)
const right = context.createOscillator()
right.type = 'square'
right.frequency.setValueAtTime(430, context.currentTime)
right.connect(splitter2)
right.connect(merger2, 0, 0)

export function playBeats () {
  merger.connect(context.destination)
  left.start()
  merger2.connect(context.destination)
  right.start()
}

export function stopBeats () {
  left.stop()
  right.stop()
}
