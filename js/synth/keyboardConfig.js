var duoSynth = require('./duoSynth');

var keyboardConfig = function(data){
  var frequency;
  if (data.on > 0){
    //convert the midi note value from data.note to frequency in Hz.
    frequency = nx.mtof(data.note);
    //apply the adsr envelopes
    asdr1.start();
    asdr2.start();
    //apply the filter asdr envelopes
    filterAsdr1.start();
    filterAsdr2.start();
    //trigger the note
    duoSynth.triggerAttack(frequency);

  } else {
    //stop all adsr envelopes
    asdr1.stop();
    asdr2.stop();
    filterAsdr1.stop();
    filterAsdr2.stop();
    duoSynth.triggerRelease();
  }
}

module.exports = keyboardConfig;
