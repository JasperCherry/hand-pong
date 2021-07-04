let model;
let videoWidth;
let videoHeight;
let fingerLookupIndices = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

const VIDEO_WIDTH = 322;
const VIDEO_HEIGHT = 242;
const TRAIN_DATA_LIMIT = 10;

let recordingRock = false;
let recordingPaper = false;

const rockData = [];
const paperData = [];

const config = {
  hiddenLayers: [20, 20],
  activation: 'sigmoid',
};

const net = new brain.NeuralNetwork(config);
net.fromJSON(modelJson);
