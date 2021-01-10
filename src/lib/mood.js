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

const forest = new Audio('../assets/music/forest.mp3')

export function playForest () {
  forest.volume = volume
  forest.loop = true
  forest.play()
}

const street = new Audio('../assets/music/street.mp3')

export function playStreet () {
  street.volume = volume
  street.loop = true
  street.play()
}

export function stop () {
  rain.pause()
  underWater.pause()
  forest.pause()
  street.pause()
}
