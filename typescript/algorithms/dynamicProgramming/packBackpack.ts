type BackpackItem = {name: string, weight: number, value: number};

const itemsAvailableToPack: BackpackItem[] = [
  {name: "Laptop", weight: 3, value: 2000},
  {name: "Audio System", weight: 4, value: 3000},
  {name: "Guitar", weight: 1, value: 1500}
];

const backPackParsedItems: BackpackItem[] = []
const backpackMatrix: {value: number, items: BackpackItem[]}[][] = [];

export const packBackpack = (
  maxWeight: number,
  itemsToParse: BackpackItem[] | null,
): BackpackItem[] => {
  if(itemsToParse) {
    for (let i = 0; i < itemsToParse.length; i++) {
      backpackMatrix.push([]);
      const itemBeingParsed = itemsToParse[i];
      const currentMatrixRow = backpackMatrix[backpackMatrix.length - 1];
      const previousMatrixRow = backpackMatrix[backpackMatrix.length - 2];

      for (let j = 0; j <= maxWeight; j++) {

        if (itemBeingParsed.weight > j) {
          currentMatrixRow.push(previousMatrixRow ? previousMatrixRow[j] : {value: 0, items: []});
          continue;
        }
        if (itemBeingParsed.weight <= j) {
          let packedItems = [itemBeingParsed];
          let valueIfPacked = itemBeingParsed.value;
          const remainingWeight = j - itemBeingParsed.weight;


          if (previousMatrixRow) {
            valueIfPacked += previousMatrixRow[remainingWeight].value;
          }

          const valueIfNotPacked = previousMatrixRow ? previousMatrixRow[j].value : 0;

          if(valueIfPacked > valueIfNotPacked) {
            packedItems = previousMatrixRow ? [...packedItems, ...previousMatrixRow[remainingWeight].items] : packedItems;
            currentMatrixRow.push({value: valueIfPacked, items: packedItems});
          } else {
            currentMatrixRow.push(previousMatrixRow ? previousMatrixRow[j] : {value: 0, items: []});
          }
        }
        backPackParsedItems.push(itemBeingParsed);
      }

    }
  }

  return backpackMatrix[backpackMatrix.length - 1][maxWeight].items;
};

// console.log(packBackpack(4, itemsAvailableToPack));
// console.log(packBackpack(4, [{name: 'Iphone', weight: 1, value: 2000}]));
// console.log(backpackMatrix[backpackMatrix.length - 1][4]);
