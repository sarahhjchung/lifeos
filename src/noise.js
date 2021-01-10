const duration = 5
const amplitude = 0.125
const context = new window.AudioContext()
const bufferSize = context.sampleRate * duration
const buffer = context.createBuffer(1, 22050, context.sampleRate)

// white noise
// TODO: cache different buffers on load
// TODO: cache different buffers on demand
const data = buffer.getChannelData(0)
for (let i = 0; i < bufferSize; i++) {
  data[i] = (Math.random() * 2 - 1) * amplitude
}

let noise = null

export function play () {
  if (noise) return
  noise = context.createBufferSource()
  noise.buffer = buffer
  noise.loop = true
  noise.connect(context.destination)
  noise.start()
}

export function stop () {
  if (noise) {
    noise.stop()
    noise = null
  }
}

// Test pink noise
const pinkBufferSize = 2048
const pinkNoise = (function () {
  const node = context.createScriptProcessor(pinkBufferSize, 1, 1)
  node.onaudioprocess = function (e) {
    const output = e.outputBuffer.getChannelData(0)
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
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
      output[i] *= 0.08
      b6 = white * 0.11
    }
  }
  return node
})()

// pinkNoise.connect(context.destination)

// Test brown noise
const brownBufferSize = 2048
const brownNoise = (function () {
  let lastOut = 0.0
  const brown = context.createScriptProcessor(brownBufferSize, 1, 1)
  brown.onaudioprocess = function (e) {
    const output = e.outputBuffer.getChannelData(0)
    for (let i = 0; i < brownBufferSize; i++) {
      const white = Math.random() * 2 - 1
      output[i] = (lastOut + (0.11 * white)) / 1.1
      lastOut = output[i]
      output[i] *= 1
    }
  }
  return brown
})()

// brownNoise.connect(context.destination)
