var tone = require('tone');

var duoSynth = new tone.DuoSynth().toMaster();

//general effects
var delay = new tone.FeedbackDelay('16n', 0.5).toMaster();
var chorus = new tone.Chorus(4, 2.5, 0.5, {type: 'square'}).toMaster();
var distortion = new tone.Distortion(0).toMaster();

//connections to duoSynth
duoSynth.connect(delay);
duoSynth.connect(chorus);
duoSynth.connect(distortion);

nx.onload = function(){
  //keyboard control
  keyboard1.on('*', function(data){
    console.log(data);
    var frequency;
    if (data.on > 0){
      //convert the midi note value from data.note to frequency in Hz.
      frequency = 440 * Math.pow(2.0, (data.note - 69.0) / 12.0);
      //apply the adsr envelopes
      envelope1.start();
      envelope2.start();
      //trigger the note
      duoSynth.triggerAttack(frequency);

    } else {
      //stop the adsr envelopes
      envelope1.stop();
      envelope2.stop();
      duoSynth.triggerRelease();
    }
  });

  //controls for the synthesizer
  //select waveforms for synthesizer
  select1.choices = ['sine', 'sawtooth', 'square', 'triangle'];
  select1.init(); //call init() to populate the select boxes.
  select2.choices = ['sine', 'sawtooth', 'square', 'triangle'];
  select2.init();
  select1.on('*', function(data){
    console.log(data);
    duoSynth.voice0.oscillator.type = data.text;
  });
  select2.on('*', function(data){
    console.log(data);
    duoSynth.voice1.oscillator.type = data.text;
  });
  envelope1.on('*', function(data){
    console.log(data);
    duoSynth.voice0.envelope.attack = data.points[0].y;
    duoSynth.voice0.envelope.decay = data.points[1].y;
    duoSynth.voice0.envelope.sustain = data.points[2].y;
    duoSynth.voice0.envelope.release = data.points[3].y;
  });
  envelope2.on('*', function(data){
    duoSynth.voice1.envelope.attack = data.points[0].y;
    duoSynth.voice1.envelope.decay = data.points[1].y;
    duoSynth.voice1.envelope.sustain = data.points[2].y;
    duoSynth.voice1.envelope.release = data.points[3].y;
  });

  //controls for effects
  //dial1 - delay control
  dial1.on('*', function(data){
    delay.delayTime.value = data.value;
  });
  //dial2 - distortion control
  dial2.on('*', function(data){
    distortion.distortion = data.value;
    if (data.value >= 0 && data.value <= 0.33){
      distortion.oversample = 'none';
    } else if (data.value >= 0.34 && data.value <= 0.67){
      distortion.oversample = '2x';
    } else {
      distortion.oversample = '4x';
    }
  });
  //position1 - chorus control
  position1.on('*', function(data){
    chorus.depth = data.x;
    chorus.feedback = data.y;
  });
}
