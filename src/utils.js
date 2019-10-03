const regExp = (str) => {
  const p = Array.from(str).reduce((acc, val, idx) => `${acc}[^${str.substr(idx)}]*?${val}`, '');
  return RegExp(p);
};

export default {
  regExp,
};
