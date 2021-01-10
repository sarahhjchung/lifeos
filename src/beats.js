// create web audio api context
const context = new window.AudioContext()

const splitter = context.createChannelSplitter(2)
const merger = context.createChannelMerger(2)


const oscillator = context.createOscillator()
oscillator.type = 'square'
oscillator.frequency.setValueAtTime(440, context.currentTime)

oscillator.connect(splitter)
splitter.connect(merger, 0, 0)

const oscillator2 = context.createOscillator();
oscillator2.type = 'square';
oscillator2.frequency.setValueAtTime(430, context.currentTime)

oscillator2.connect(splitter)
oscillator2.connect(merger, 0, 1)


export default function playBeats () {
    merger.connect(context.destination)
    oscillator.start()
    oscillator2.start()

}

