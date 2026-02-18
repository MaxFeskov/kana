export const repeat = (needRepeat, count = 10) => {
  if (count) {
    needRepeat?.(count);
    setTimeout(repeat, 1000, needRepeat, --count);
  }
};
