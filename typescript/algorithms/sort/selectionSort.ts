const findSmallestIndex = (array: never[]) => {
  if (array.length === 0) {
    return -1;
  }

  let smallestIndex = 0;
  let smallestValue = array[smallestIndex];

  for (let i = 1; i < array.length; i++) {
    if (array[i] < smallestValue) {
      smallestIndex = i;
      smallestValue = array[i];
    }
  }

  return smallestIndex;
}

/**
 * Selection sort algorithm. O(n^2) time complexity
 * @param array
 * @returns sorted array
 */
export const selectionSort = (array: never[]): never[] => {
  const result: never[] = [];

  for (let i = 1; i < array.length; i++) {
    const currentSmallestIndex = findSmallestIndex(array);
    result.push(array.splice(currentSmallestIndex, 1)[0]);
  }

  return result;
}