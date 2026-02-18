import {
  appendElementText,
  getCheckedTextBySelector,
  setElementText,
} from "./modules/html.js";
import { getSymbols, isCorrectAnswer } from "./modules/kana.js";
import { Voice } from "./modules/vioce.js";

(async () => {
  const answers = [];
  let answerIndex = 0;
  let voice;

  const startEl = document.getElementById("start");
  const stopEl = document.getElementById("stop");
  const answerEl = document.getElementById("answer");
  const symbolEl = document.getElementById("symbol");
  const historyEl = document.getElementById("history");

  const stop = () => {
    startEl?.classList.remove("hide");
    stopEl?.classList.add("hide");
    answerEl?.setAttribute("disabled", "disabled");
  };

  const restart = () => {
    setElementText(symbolEl, answers[0]);
    setElementText(historyEl, "");

    if (answerEl) {
      answerEl.removeAttribute("disabled");
      answerEl.focus();
    }
  };

  document.getElementById("form")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formEl = event.target;
    const answer = new FormData(formEl).get("answer");
    const correctAnswer = answers[answerIndex];

    if (answerIndex) {
      appendElementText(historyEl, { text: ", " });
    }

    appendElementText(historyEl, {
      className: isCorrectAnswer(answer, correctAnswer)
        ? "correct"
        : "incorrect",
      text: correctAnswer,
    });

    voice.speak(correctAnswer);
    formEl.reset();

    const nextAnswer = answers[++answerIndex];

    if (nextAnswer) {
      setElementText(symbolEl, nextAnswer);
    } else {
      stop();
    }
  });

  startEl.addEventListener("click", async () => {
    voice = new Voice({ lang: "ja-JP" });
    answerIndex = 0;
    startEl.classList.add("hide");
    stopEl?.classList.remove("hide");

    const baseFilters = getCheckedTextBySelector(
      '.checkbox-label:has(input[type="checkbox"]:checked)',
    );
    const extFilters = getCheckedTextBySelector(
      '.group-label:has(input[type="checkbox"]:checked)',
    );

    await getSymbols(answers, { baseFilters, extFilters });

    if (!answers.length) return stop();

    restart();
  });

  stopEl.addEventListener("click", () => stop());

  historyEl.addEventListener("click", (event) => {
    voice.speak(event.target.innerHTML);
  });
})();
