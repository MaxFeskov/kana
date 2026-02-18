import { isArr } from "./arrays.js";

export const isObj = (obj) => (obj ? obj === Object(obj) : false);

export const isEmptyObj = (object) => JSON.stringify(object) === "{}";

export const isEqualObj = (obj1, obj2) => {
  const aProps = Object.getOwnPropertyNames(obj1);
  const bProps = Object.getOwnPropertyNames(obj2);

  if (aProps.length !== bProps.length) return false;

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];
    if (obj1[propName] !== obj2[propName]) return false;
  }

  return true;
};

export const isEqualObj2 = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const keyInObj = (obj, arrProp) => {
  if (!obj || !isArr(arrProp)) return false;

  let object = obj;

  for (let i = 0; i < arrProp.length; i++) {
    if (object[arrProp[i]]) {
      object = object[arrProp[i]];
    } else {
      return false;
    }
  }

  return true;
};

export const getObjProp = (obj, arrProp) => {
  if (!obj && !isArr(arrProp)) return undefined;

  let object = obj;

  for (let i = 0; i < arrProp.length; i++) {
    if (
      object != null &&
      typeof object === "object" &&
      object[arrProp[i]] !== undefined
    ) {
      object = object[arrProp[i]];
    } else {
      return undefined;
    }
  }

  return object;
};

export const copyObj = (obj) => JSON.parse(JSON.stringify(obj));
