const rain = new Audio('../assets/ambience-rain.mp3')
const water = new Audio('../assets/ambience-water.mp3')
const forest = new Audio('../assets/ambience-forest.mp3')
const street = new Audio('../assets/ambience-street.mp3')

let volume = 0.5

export function setVolume (v) {
  volume = v / 100
}

export function playRain () {
  rain.volume = volume
  rain.loop = true
  rain.play()
}

export function playWater () {
  water.volume = volume
  water.loop = true
  water.play()
}

export function playForest () {
  forest.volume = volume
  forest.loop = true
  forest.play()
}

export function playStreet () {
  street.volume = volume
  street.loop = true
  street.play()
}

export function stop () {
  rain.pause()
  water.pause()
  forest.pause()
  street.pause()
}
