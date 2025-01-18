const stringifyAndSort = (arr: string[]) =>
  arr.map((item) => JSON.stringify(item)).sort();

export const areArraysEqualUnorderedDeep = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = stringifyAndSort(arr1);
  const sortedArr2 = stringifyAndSort(arr2);

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};

// Example usage
//   const array1 = [{ id: 1 }, { id: 2 }];
//   const array2 = [{ id: 2 }, { id: 1 }];

// true
