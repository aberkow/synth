var tone = require('tone');

//keyboard reqs
var duoSynth = require('./synth/duoSynth.js');
var keyboardConfig = require('./synth/keyboardConfig.js');

//keyboard effect reqs
var harmonicityConfig = require('./synth/harmonicityConfig.js');
var vibratoConfig = require('./synth/vibratoConfig.js');
//var voiceWaveConfig = require('./synth/voiceWaveConfig.js');

//effect reqs
var chorusConfig = require('./effects/chorusConfig.js');
var delayConfig = require('./effects/delayConfig.js');
var distortionConfig = require('./effects/distortionConfig.js');

//load the synth and all effects
nx.onload = function(){
  console.log(duoSynth);
  var waveChoices = ['sine', 'sawtooth', 'square', 'triangle'];
  var filterChoices = ['lowpass', 'highpass', 'bandpass', 'low shelf', 'high shelf', 'notch', 'all pass', 'peaking'];
  // var asdrArray = [data.points[0].y, data.points[1].y, data.points[2].y, data.points[3].y];

  //keyboard control
  keyboard1.on('*', function(data){
    keyboardConfig(data);
  });

  //controls for the synthesizer
  //select waveforms for synthesizer
  voiceWave1.choices = waveChoices;
  voiceWave1.init(); //call init() to populate the select boxes.
  voiceWave2.choices = waveChoices;
  voiceWave2.init();
  voiceWave1.on('*', function(data){
    // var voiceWave = duoSynth.voice0.oscillator.type;
    // voiceWaveConfig(data, voiceWave);
    //voiceWaveConfig(data, voice0);
    duoSynth.voice0.oscillator.type = data.text;
  });
  voiceWave2.on('*', function(data){
    duoSynth.voice1.oscillator.type = data.text;
  });
  //asdr envelopes for synth
  asdr1.on('*', function(data){
    // duoSynth.voice0.envelope.attack = asdrArray[0];
    // duoSynth.voice0.envelope.decay = asdrArray[1];
    // duoSynth.voice0.envelope.sustain = asdrArray[2];
    // duoSynth.voice0.envelope.release = asdrArray[3];
    duoSynth.voice0.envelope.attack = data.points[0].y;
    duoSynth.voice0.envelope.decay = data.points[1].y;
    duoSynth.voice0.envelope.sustain = data.points[2].y;
    duoSynth.voice0.envelope.release = data.points[3].y;
  });
  asdr2.on('*', function(data){
    duoSynth.voice1.envelope.attack = data.points[0].y;
    duoSynth.voice1.envelope.decay = data.points[1].y;
    duoSynth.voice1.envelope.sustain = data.points[2].y;
    duoSynth.voice1.envelope.release = data.points[3].y;
  });
  //vibrato
  vibrato.on('*', function(data){
    vibratoConfig(data);
  });
  //harmonicity
  harmonicity.set({ value: 0.5 });
  harmonicity.on('*', function(data){
    harmonicityConfig(data);
  });
  //filter select

  filterType1.choices = filterChoices;
  filterType1.init(); //call init() to populate the select boxes.
  filterType2.choices = filterChoices;
  filterType2.init();
  filterType1.on('*', function(data){
    duoSynth.voice0.filter._type = data.text;
  });
  filterType2.on('*', function(data){
    duoSynth.voice1.filter._type = data.text;
  });
  //filter asdr
  filterAsdr1.on('*', function(data){
    duoSynth.voice0.filterEnvelope.attack = data.points[0].y;
    duoSynth.voice0.filterEnvelope.decay = data.points[1].y;
    duoSynth.voice0.filterEnvelope.sustain = data.points[2].y;
    duoSynth.voice0.filterEnvelope.release = data.points[3].y;
  });
  filterAsdr2.on('*', function(data){
    duoSynth.voice1.filterEnvelope.attack = data.points[0].y;
    duoSynth.voice1.filterEnvelope.decay = data.points[1].y;
    duoSynth.voice1.filterEnvelope.sustain = data.points[2].y;
    duoSynth.voice1.filterEnvelope.release = data.points[3].y;
  });
  //filter Q and rolloff
  qAndFreq1.on('*', function(data){
    var qValue = nx.scale(data.x, 0.0, 1.0, 0.0, 18.0);
    var freqValue = nx.scale(data.y, 0.0, 1.0, 30.0, 22000.0);
    duoSynth.voice0.filter.Q.input.value = qValue;
    duoSynth.voice0.filter.frequency.input.value = freqValue;
  });
  qAndFreq2.on('*', function(data){
    var qValue = nx.scale(data.x, 0.0, 1.0, 0.0, 18.0);
    var freqValue = nx.scale(data.y, 0.0, 1.0, 30.0, 22000.0);
    duoSynth.voice1.filter.Q.input.value = qValue;
    duoSynth.voice1.filter.frequency.input.value = freqValue;
  });

  //controls for effects
  //delay control
  delayControl.on('*', function(data){
    delayConfig(data);
  });
  //distortion control
  distortionControl.on('*', function(data){
    distortionConfig(data);
  });
  //chorus control
  chorusControl.on('*', function(data){
    chorusConfig(data);
  });
}
