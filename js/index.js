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
      asdr1.start();
      asdr2.start();
      //trigger the note
      duoSynth.triggerAttack(frequency);

    } else {
      //stop the adsr envelopes
      asdr1.stop();
      asdr2.stop();
      duoSynth.triggerRelease();
    }
  });

  //controls for the synthesizer
  //select waveforms for synthesizer
  voiceWave1.choices = ['sine', 'sawtooth', 'square', 'triangle'];
  voiceWave1.init(); //call init() to populate the select boxes.
  voiceWave2.choices = ['sine', 'sawtooth', 'square', 'triangle'];
  voiceWave2.init();
  voiceWave1.on('*', function(data){
    duoSynth.voice0.oscillator.type = data.text;
  });
  voiceWave2.on('*', function(data){
    duoSynth.voice1.oscillator.type = data.text;
  });
  //asdr envelopes for synth
  asdr1.on('*', function(data){
    console.log(data);
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
    var vibratoRate = nx.scale(data.x, 0.0, 1.0, 0.0, 20.0);
    console.log(vibratoRate);
    duoSynth.vibratoAmount = data.y;
    duoSynth.vibratoRate = vibratoRate;
  });
  //harmonicity
  harmonicity.set({ value: 0.5 });
  harmonicity.on('*', function(data){
    var harmonicityRatio = nx.scale(data.value, 0.0, 1.0, 0.0, 2.0);
    duoSynth.harmonicity.value = harmonicityRatio;
  });
  //filter select
  filterType1.choices = ['lowpass', 'highpass', 'bandpass', 'low shelf', 'high shelf', 'notch', 'all pass', 'peaking'];
  filterType1.init(); //call init() to populate the select boxes.
  filterType2.choices = ['lowpass', 'highpass', 'bandpass', 'low shelf', 'high shelf', 'notch', 'all pass', 'peaking'];
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
    duoSynth.voice0.filter.Q.input.value = qValue;
    duoSynth.voice1.filter.frequency.input.value = data.y;
  });
  qAndFreq2.on('*', function(data){
    var qValue = nx.scale(data.x, 0.0, 1.0, 0.0, 18.0);
    duoSynth.voice0.filter.Q.input.value = qValue;
    duoSynth.voice1.filter.frequency.input.value = data.y;
  });

  //controls for effects
  //dial1 - delay control
  // delay.on('*', function(data){
  //   delay.delayTime.value = data.value;
  // });
  // //dial2 - distortion control
  // distortion.on('*', function(data){
  //   distortion.distortion = data.value;
  //   if (data.value >= 0 && data.value <= 0.33){
  //     distortion.oversample = 'none';
  //   } else if (data.value >= 0.34 && data.value <= 0.67){
  //     distortion.oversample = '2x';
  //   } else {
  //     distortion.oversample = '4x';
  //   }
  // });
  // //position1 - chorus control
  // chorus.on('*', function(data){
  //   chorus.depth = data.x;
  //   chorus.feedback = data.y;
  // });
}
