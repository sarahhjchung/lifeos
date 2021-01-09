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

export default function toggle () {
  if (!noise) {
    noise = context.createBufferSource()
    noise.buffer = buffer
    noise.loop = true
    noise.connect(context.destination)
    noise.start()
  } else {
    noise.stop()
    noise = null
  }
}
