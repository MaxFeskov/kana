export const isArr = (arr) => Array.isArray(arr);

export const inArr = (arr, item) =>
  isArr(arr) ? arr.indexOf(item) !== -1 : false;

export const copyArr = (arr) => (isArr(arr) ? arr.slice(0) : []);

export const clearArr = (arr) => isArr(arr) && arr.splice(0, arr.length);

export const delFromArr = (arr, item) => {
  if (!isArr(arr)) return;

  const index = arr.indexOf(item);
  if (~index) arr.splice(index, 1);
};

export const arrToObj = (arr) => {
  if (!isArr(arr)) return {};

  const obj = {};
  arr.map((item, index) => (obj[Number(index)] = item));

  return obj;
};

export const flatArr = (arr) => (isArr(arr) ? [].concat(...arr) : []);

export const randomSortArr = (arr) =>
  isArr(arr) && arr.sort(() => 0.5 - Math.random());
