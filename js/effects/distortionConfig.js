var tone = require('tone');
var duoSynth = require('../synth/duoSynth');

var distortion = new tone.Distortion(0).toMaster();

duoSynth.connect(distortion);

var distortionConfig = function(data){
  distortion.distortion = data.value;
  if (data.value >= 0 && data.value <= 0.33){
    distortion.oversample = 'none';
  } else if (data.value >= 0.34 && data.value <= 0.67){
    distortion.oversample = '2x';
  } else {
    distortion.oversample = '4x';
  }
}

module.exports = distortionConfig;
