import * as wanakana from "../libs/wanakana.js";
import { clearArr, isArr, randomSortArr } from "./arrays.js";
import { loadJSONList } from "./loaders.js";
import { getObjProp } from "./objects.js";

export const isCorrectAnswer = (answer, correctAnswer) => {
  if (wanakana.isKatakana(correctAnswer)) answer = wanakana.toKatakana(answer);
  if (wanakana.isHiragana(correctAnswer)) answer = wanakana.toHiragana(answer);

  if (answer === correctAnswer) return true;
};

export const getSymbols = async (result, { baseFilters, extFilters }) => {
  const symbolData = await loadJSONList([
    "data/hiragana.json",
    "data/katakana.json",
  ]);

  const baseHiragana = getObjProp(symbolData[0], ["base"]);
  const extendedHiragana = getObjProp(symbolData[0], ["extended"]);
  const baseKatakana = getObjProp(symbolData[1], ["base"]);
  const extendedKatakana = getObjProp(symbolData[1], ["extended"]);

  const data = [];

  if (baseFilters.includes("あ")) {
    data.push(...baseHiragana);

    if (baseFilters.includes("extended")) {
      data.push(...extendedHiragana);
    }
  }

  if (baseFilters.includes("ア")) {
    data.push(...baseKatakana);

    if (baseFilters.includes("extended")) {
      data.push(...extendedKatakana);
    }
  }

  const answers = randomSortArr(
    data
      .filter(({ group }) => extFilters.includes(group))
      .map(({ symbol }) => symbol),
  );

  if (isArr(answers)) {
    clearArr(result);
    result.push(...answers);
  }
};
