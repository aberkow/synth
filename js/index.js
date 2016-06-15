var tone = require('tone');

//keyboard reqs
var duoSynth = require('./synth/duoSynth.js');
var keyboardConfig = require('./synth/keyboardConfig.js');

//keyboard effect reqs
var filterTypeConfig = require('./synth/filterTypeConfig.js');
var harmonicityConfig = require('./synth/harmonicityConfig.js');
var vibratoConfig = require('./synth/vibratoConfig.js');
var voiceWaveConfig = require('./synth/voiceWaveConfig.js');

//effect reqs
var chorusConfig = require('./effects/chorusConfig.js');
var delayConfig = require('./effects/delayConfig.js');
var distortionConfig = require('./effects/distortionConfig.js');

//load the synth and all effects
nx.onload = function(){
  //keyboard control
  keyboard1.on('*', function(data){
    keyboardConfig(data);
  });

  //controls for the synthesizer

  //select waveforms for synthesizer
  voiceWave1.choices = voiceWaveConfig.waveChoices;
  voiceWave1.init(); //call init() to populate the select boxes.
  voiceWave2.choices = voiceWaveConfig.waveChoices;
  voiceWave2.init();
  voiceWave1.on('*', function(data){
    voiceWaveConfig.voiceWaveAssign0(data);
  });
  voiceWave2.on('*', function(data){
    voiceWaveConfig.voiceWaveAssign1(data);
  });

  //asdr envelopes for synth
  asdr1.on('*', function(data){
    var envelope = duoSynth.voice0.envelope;
    envelope.attack = data.points[0].y;
    envelope.decay = data.points[1].y;
    envelope.sustain = data.points[2].y;
    envelope.release = data.points[3].y;
  });
  asdr2.on('*', function(data){
    var envelope = duoSynth.voice1.envelope;
    envelope.attack = data.points[0].y;
    envelope.decay = data.points[1].y;
    envelope.sustain = data.points[2].y;
    envelope.release = data.points[3].y;
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
  filterType1.choices = filterTypeConfig.filterChoices;
  filterType1.init(); //call init() to populate the select boxes.
  filterType2.choices = filterTypeConfig.filterChoices;
  filterType2.init();
  filterType1.on('*', function(data){
    filterTypeConfig.filterTypeAssign0(data);
  });
  filterType2.on('*', function(data){
    filterTypeConfig.filterTypeAssign1(data);
  });

  //filter asdr
  filterAsdr1.on('*', function(data){
    var envelope = duoSynth.voice0.filterEnvelope;
    envelope.attack = data.points[0].y;
    envelope.decay = data.points[1].y;
    envelope.sustain = data.points[2].y;
    envelope.release = data.points[3].y;
  });
  filterAsdr2.on('*', function(data){
    var envelope = duoSynth.voice1.filterEnvelope
    envelope.attack = data.points[0].y;
    envelope.decay = data.points[1].y;
    envelope.sustain = data.points[2].y;
    envelope.release = data.points[3].y;
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
