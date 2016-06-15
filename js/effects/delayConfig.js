var tone = require('tone');
var duoSynth = require('../synth/duoSynth');

var delay = new tone.FeedbackDelay('16n', 0.5).toMaster();

duoSynth.connect(delay);

var delayConfig = function(data){
  delay.delayTime.value = data.value;
}

module.exports = delayConfig;
