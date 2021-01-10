//Test pink noise
// const pinkBufferSize = 4096;
// let pinkNoise = (function() {
//     let b0, b1, b2, b3, b4, b5, b6;
//     b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
//     let node = context.createScriptProcessor(pinkBufferSize, 1, 1);
//     node.onaudioprocess = function(e) {
//         let output = e.outputBuffer.getChannelData(0);
//         for (let i = 0; i < pinkBufferSize; i++) {
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

// pinkNoise.connect(audioContext.destination);