let volume = 0.1

export function setVolume (v) {
  volume = v / 100
}

const rain = new Audio('../assets/music/rain.mp3')

export function playRain () {
  rain.volume = volume
  rain.loop = true
  rain.play()
}

const underWater = new Audio('../assets/music/underWater.mp3')

export function playWater () {
  underWater.volume = volume
  underWater.loop = true
  underWater.play()
}

export function stop () {
  rain.pause()
  underWater.pause()
}
