var tone = require('tone');
var duoSynth = require('../synth/duoSynth');

var chorus = new tone.Chorus(4, 2.5, 0.5, {type: 'square'}).toMaster();

duoSynth.connect(chorus);

var chorusConfig = function(data){
  chorus.depth = data.x;
  chorus.feedback = data.y;
}

module.exports = chorusConfig;
