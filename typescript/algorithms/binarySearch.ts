/**
 * Binary search algorithm
 * @param sortedList
 * @param itemToSearch
 * @returns the index of the number in the list if it exists, otherwise -1
 */
export const binarySearch = (sortedList: number[], itemToSearch: number): number => {
  let low = 0;
  let high = sortedList.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    const guess = sortedList[mid];

    if (guess === itemToSearch) {
      return mid;
    }

    if (guess > itemToSearch) {
      high = mid - 1;
    }

    if (guess < itemToSearch) {
      low = mid + 1;
    }
  }

  return -1;
};

/**
 * Recursive binary search algorithm
 * @param sortedList
 * @param itemToSearch
 * @param low lowest index in search range
 * @param high highest index in search range
 */
export const recursiveBinarySearch = (
  sortedList: number[],
  itemToSearch: number,
  low: number = 0,
  high: number = sortedList.length - 1
): number => {
  if (low > high) {
    return -1;
  }

  const mid = Math.floor((low + high) / 2);
  const guess = sortedList[mid];

  if (guess === itemToSearch) {
    return mid;
  }

  return guess > itemToSearch ? recursiveBinarySearch(sortedList, itemToSearch, low, mid - 1) : recursiveBinarySearch(sortedList, itemToSearch, mid + 1, high)
};
