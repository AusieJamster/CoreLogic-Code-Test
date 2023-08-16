export const sumNaturalNumsBelowX = (x: number) => {
  return listNaturalNumsBelowLimit(x).length;
};

const listNaturalNumsBelowLimit = (limit: number) => {
  const nums: number[] = [];

  for (let i = 1; i < limit; i++) {
    if (i % 3 === 0 || i % 5 === 0) nums.push(i);
  }

  return nums;
};

export const getLargestPrimeNumberFrom = (num: number) => {
  let factor = 2;
  while (num > 1) {
    if (num % factor === 0) num /= factor;
    else factor++;
  }
  return factor;
};
