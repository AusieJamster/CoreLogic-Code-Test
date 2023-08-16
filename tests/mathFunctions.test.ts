import {
  getLargestPrimeNumberFrom,
  sumNaturalNumsBelowX,
} from "@lib/mathFunctions";

describe("mathFunctions", () => {
  describe("listNaturalNumsBelowLimit", () => {
    test("should succeed", () => {
      const result = sumNaturalNumsBelowX(10);

      expect(result).toStrictEqual(4);
    });
  });

  describe("getPrimesBelowLimit", () => {
    test("should succeed", () => {
      const result = getLargestPrimeNumberFrom(13195);

      expect(result).toStrictEqual(29);
    });
  });
});
