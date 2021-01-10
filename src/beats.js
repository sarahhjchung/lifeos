// create web audio api context
const context = new window.AudioContext()

// const splitter = context.createChannelSplitter(2)
const merger = context.createChannelMerger(2)



// create Oscillator node
const oscillator = context.createOscillator()
oscillator.type = 'square'
oscillator.frequency.setValueAtTime(440, context.currentTime)



const oscillator2 = context.createOscillator();
oscillator2.type = 'square';
oscillator2.frequency.setValueAtTime(100, context.currentTime)

oscillator.connect(merger, 0, 0)
oscillator2.connect(merger, 0, 1)


export default function playBeats () {

    // oscillator.connect(context.destination)
    // oscillator.start()

    // oscillator2.connect(context.destination)
    // oscillator2.start()

    merger.connect(context.destination)
    merger.start()

}

