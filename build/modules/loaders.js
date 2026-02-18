import { isArr } from "./arrays.js";

export const loadJSON = (url) =>
  fetch(url)
    .then((r) => r.json())
    .catch(() => console.log(`Error loaded ${url}`));

export const loadJSONList = (urlArr) => {
  const resultArr = [];

  if (!isArr(urlArr)) return;

  urlArr.map((url) => resultArr.push(loadJSON(url)));

  return Promise.all(resultArr);
};
