const sum = (arr) => arr.reduce((acc, curr) => acc + curr, 0);
const removeDuplicates = (arr) => [...new Set(arr)];
const average = (arr) => {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
};
const max = (arr) => Math.max(...arr);
const min = (arr) => Math.min(...arr);
const sortDesc = (arr) => [...arr].sort((a, b) => b - a);
const median = (arr) => {
  if (arr.length === 0) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};
const filterEven = (arr) => arr.filter((num) => num % 2 === 0);
const filterOdd = (arr) => arr.filter((num) => num % 2 !== 0);
const clear = (arr) => (arr.length = 0);

module.exports = {
  sum,
  removeDuplicates,
  average,
  max,
  min,
  sortDesc,
  median,
  filterEven,
  filterOdd,
  clear,
};

