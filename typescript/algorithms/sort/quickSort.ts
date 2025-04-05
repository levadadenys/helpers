/**
 * Quick sort algorithm. O(nlog n) time complexity
 * @param array
 */
export const quickSort = (array: number[]): number[] => {
  if(array.length < 2) {
    return array;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  const lesserArray = [];
  const greaterArray = [];

  for(let i = 0; i < array.length; i++) {
    if(array[i] <= array[randomIndex]) {
      lesserArray.push(array[i]);
    } else if(array[i] > array[randomIndex]) {
      greaterArray.push(array[i]);
    }
  }

  return [...quickSort(lesserArray), ...quickSort(greaterArray)];
}
