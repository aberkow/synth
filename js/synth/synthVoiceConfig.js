var duoSynth = require('./duoSynth');

var synthVoiceConfig = {
  voice0: {
    envelope: {
      attack: duoSynth.voice0.envelope.attack,
      decay: duoSynth.voice0.envelope.decay,
      sustain: duoSynth.voice0.envelope.sustain,
      release: duoSynth.voice0.envelope.release
    },
    filter: {
      q: duoSynth.voice0.filter.Q.input.value,
      frequency: duoSynth.voice0.filter.frequency.input.value
    },
    filterEnvelope: {
      attack: duoSynth.voice0.filterEnvelope.attack,
      decay: duoSynth.voice0.filterEnvelope.decay,
      sustain: duoSynth.voice0.filterEnvelope.sustain,
      release: duoSynth.voice0.filterEnvelope.release
    },
    filterType: {
      type: duoSynth.voice0.filter._type
    }
  },
  voice1: {
    envelope: {
      attack: duoSynth.voice0.envelope.attack,
      decay: duoSynth.voice0.envelope.decay,
      sustain: duoSynth.voice0.envelope.sustain,
      release: duoSynth.voice0.envelope.release
    },
    filter: {
      q: duoSynth.voice0.filter.Q.input.value,
      frequency: duoSynth.voice0.filter.frequency.input.value
    },
    filterEnvelope: {
      attack: duoSynth.voice0.filterEnvelope.attack,
      decay: duoSynth.voice0.filterEnvelope.decay,
      sustain: duoSynth.voice0.filterEnvelope.sustain,
      release: duoSynth.voice0.filterEnvelope.release
    },
    filterType: {
      type: duoSynth.voice0.filter._type
    }
  }
}

module.exports = synthVoiceConfig;
