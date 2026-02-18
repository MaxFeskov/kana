const SpeechRecognition =
  globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;

export class Recognition {
  constructor({ lang, phrases, onStart, onStop, onResult, onError }) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (phrases) {
      console.log({ phrases });

      const phraseObjects = phrases.map(
        (phrase) => new SpeechRecognitionPhrase(phrase, 5),
      );
      recognition.processLocally = true;
      recognition.phrases = phraseObjects;
    }

    this.recognition = recognition;
    this.lang = lang;
    this.onStart = onStart;
    this.onStop = onStop;
    this.onError = onError;
    this.onResult = onResult;
    this.isDone = false;

    recognition.addEventListener("start", () => {
      this.onStart?.();
      this.isDone = false;
    });

    recognition.addEventListener("end", () => {
      this.onStop?.();
    });

    recognition.addEventListener("result", (event) => {
      if (this.isDone) {
        this.isDone = false;
        this.onResult?.(event.results);
      }
    });

    recognition.addEventListener("nomatch", () => {
      console.error("Speech not recognized");
    });

    recognition.addEventListener("speechstart", () => {
      console.log("speechstart");
    });

    recognition.addEventListener("speechend", () => {
      console.log("speechend");
      this.recognition.stop();
      this.isDone = true;
    });

    recognition.addEventListener("error", (event) => {
      console.log(event.error);
      this.onError?.(event.error);
      this.onStop?.();
    });
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  avalibleLang() {
    SpeechRecognition.available({
      langs: [this.lang],
      processLocally: true,
    }).then((result) => {
      if (result === "available") {
        this.onError?.(`${this.lang} is available`);
      } else if (result === "unavailable") {
        this.onError?.(
          `${this.lang} not available to download at this time. Sorry!`,
        );
      } else if (result === "downloadable") {
        this.onError?.(`${this.lang} language pack is downloading...`);

        SpeechRecognition.install({
          langs: [this.lang],
          processLocally: true,
        }).then((result) => {
          if (result) {
            this.onError?.(
              `${this.lang} language pack downloaded. Start recognition again.`,
            );
          } else {
            this.onError?.(
              `${this.lang} language pack failed to download. Try again later.`,
            );
          }
        });
      }
    });
  }
}
