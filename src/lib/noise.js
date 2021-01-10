const duration = 5
const amplitude = 0.1125
let volume = 0.5

export function setVolume (v) {
  volume = v / 100
}

const context = new window.AudioContext()
const bufferSize = context.sampleRate * duration
const buffer = context.createBuffer(1, 22050, context.sampleRate)

// white noise
// TODO: cache different buffers on load
// TODO: cache different buffers on demand
const data = buffer.getChannelData(0)
for (let i = 0; i < bufferSize; i++) {
  data[i] = (Math.random() * 2 - 1) * 0.03
}

let noise = null

export function playWhite () {
  if (noise) return
  noise = context.createBufferSource()
  const gainNode = context.createGain()
  noise.buffer = buffer
  noise.loop = true
  noise.connect(gainNode)
  gainNode.connect(context.destination)
  gainNode.gain.setValueAtTime(volume, context.currentTime)
  noise.start()
}

// Test pink noise buffer
const pinkBuffer = context.createBuffer(1, 22050, context.sampleRate)
const pinkBufferSize = context.sampleRate * duration

const pink = pinkBuffer.getChannelData(0)
for (let i = 0; i < pinkBufferSize; i++) {
  const white = Math.random() * 2 - 1
  let b0, b1, b2, b3, b4, b5, b6
  b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0
  b0 = 0.99 * b0 + white * 0.05
  b1 = 0.98 * b1 + white * 0.07
  b2 = 0.96 * b2 + white * 0.15
  b3 = 0.86 * b3 + white * 0.30
  b4 = 0.55 * b4 + white * 0.50
  b5 = -0.8 * b5 - white * 0.02
  b6 = white * 0.11
  pink[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
  pink[i] *= 0.01
}

export function playPink () {
  if (noise) return
  noise = context.createBufferSource()
  const gainNode = context.createGain()
  noise.buffer = pinkBuffer
  noise.loop = true
  noise.connect(gainNode)
  gainNode.connect(context.destination)
  gainNode.gain.setValueAtTime(volume, context.currentTime)
  noise.start()
}

// Test brown noise 2
const brownBuffer = context.createBuffer(1, 22050, context.sampleRate)
const brownBufferSize = context.sampleRate * duration

const brown = brownBuffer.getChannelData(0)
let lastOut = 0.0
for (let i = 0; i < brownBufferSize; i++) {
  const white = Math.random() * 2 - 1
  brown[i] = (lastOut + (0.11 * white)) / 1.1
  lastOut = brown[i]
  brown[i] *= amplitude
}

export function playBrown () {
  if (noise) return
  noise = context.createBufferSource()
  const gainNode = context.createGain()
  noise.buffer = brownBuffer
  noise.loop = true
  noise.connect(gainNode)
  gainNode.connect(context.destination)
  gainNode.gain.setValueAtTime(volume, context.currentTime)
  noise.start()
}

export function stop () {
  if (noise) {
    noise.stop()
    noise = null
  }
}
