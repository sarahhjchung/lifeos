//Test pink noise
// const pinkBufferSize = 4096;
// let pinkNoise = (function() {
//     let node = context.createScriptProcessor(pinkBufferSize, 1, 1);
//     node.onaudioprocess = function(e) {
//         let output = e.outputBuffer.getChannelData(0);
//         for (let i = 0; i < pinkBufferSize; i++) {
//             let b0, b1, b2, b3, b4, b5, b6;
//             b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
//             let white = Math.random() * 2 - 1;
//             b0 = 0.99886 * b0 + white * 0.0555179;
//             b1 = 0.99332 * b1 + white * 0.0750759;
//             b2 = 0.96900 * b2 + white * 0.1538520;
//             b3 = 0.86650 * b3 + white * 0.3104856;
//             b4 = 0.55000 * b4 + white * 0.5329522;
//             b5 = -0.7616 * b5 - white * 0.0168980;
//             output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
//             output[i] *= 0.11; // (roughly) compensate for gain
//             b6 = white * 0.115926;
//         }
//     }
//     return node;
// })();

// pinkNoise.connect(context.destination);

//Test brown noise
// let brownBufferSize = 2048;
// let brownNoise = (function() {
//     let lastOut = 0.0;
//     let brown = context.createScriptProcessor(brownBufferSize, 1, 1);
//     brown.onaudioprocess = function(e) {
//         let output = e.outputBuffer.getChannelData(0);
//         for (let i = 0; i < brownBufferSize; i++) {
//             let white = Math.random() * 2 - 1;
//             output[i] = (lastOut + (0.11 * white)) / 1.1;
//             lastOut = output[i];
//             output[i] *= 1; // (roughly) compensate for gain
//         }
//     }
//     return brown;
// })();

//brownNoise.connect(context.destination);

// Test pink noise
// const pinkBufferSize = 2048
// const pinkNoise = (function () {
//   noise = context.createScriptProcessor(pinkBufferSize, 1, 1)
//   noise.onaudioprocess = function (e) {
//     const output = e.outputBuffer.getChannelData(0)
//     for (let i = 0; i < pinkBufferSize; i++) {
//       const white = Math.random() * 2 - 1
//       let b0, b1, b2, b3, b4, b5, b6
//       b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0
//       b0 = 0.99 * b0 + white * 0.05
//       b1 = 0.98 * b1 + white * 0.07
//       b2 = 0.96 * b2 + white * 0.15
//       b3 = 0.86 * b3 + white * 0.30
//       b4 = 0.55 * b4 + white * 0.50
//       b5 = -0.8 * b5 - white * 0.02
//       b6 = white * 0.11
//       output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
//       output[i] *= amplitude
//     }
//   }
//   return noise
// })()

// export function playPink () {
//   noise = pinkNoise
//   noise.connect(context.destination)
// }

// Test brown noise
// const brownBufferSize = 2048
// const brownNoise = (function () {
//   let lastOut = 0.0
//   const brown = context.createScriptProcessor(brownBufferSize, 1, 1)
//   brown.onaudioprocess = function (e) {
//     const output = e.outputBuffer.getChannelData(0)
//     for (let i = 0; i < brownBufferSize; i++) {
//       const white = Math.random() * 2 - 1
//       output[i] = (lastOut + (0.11 * white)) / 1.1
//       lastOut = output[i]
//       output[i] *= amplitude
//     }
//   }
//   return brown
// })()

// export function playBrown () {
//   brownNoise.connect(context.destination)
// }