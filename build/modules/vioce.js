import { randomSortArr } from "./arrays.js";

const synth = window.speechSynthesis;

export class Voice {
  constructor({ lang }) {
    this.lang = lang;
    const [voice] = randomSortArr(
      synth.getVoices().filter(({ lang }) => lang === this.lang),
    );
    this.voice = voice;
  }

  speak(text) {
    if (!text) return;
    if (synth.speaking) synth.cancel();

    const phrase = new SpeechSynthesisUtterance(text);
    phrase.voice = this.voice;
    synth.speak(phrase);
  }
}
