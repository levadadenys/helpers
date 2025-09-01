type BackpackItem = {name: string, weight: number, value: number};

const itemsAvailableToPack: BackpackItem[] = [
  {name: "Laptop", weight: 9, value: 2000},
  {name: "Audio System", weight: 14, value: 3000},
  {name: "Guitar", weight: 7, value: 1500}
];

export const packBackpack = (
  items: BackpackItem[],
  maxWeight: number,
  sortedByValueItemsArray: BackpackItem[],
  packedItems: BackpackItem[] = []
) => {
  let availableWeight = maxWeight;
  if(!sortedByValueItemsArray) {
    sortedByValueItemsArray = [...items].sort((a, b) => (b.value) - (a.value));
  }

  for (let i = 0; i < sortedByValueItemsArray.length; i++) {
    if(sortedByValueItemsArray[i].weight <= maxWeight) {
      // Remove item from available items
      const itemToPack = sortedByValueItemsArray.splice(i, 1)[0];
      packedItems.push(itemToPack);
      availableWeight -= itemToPack.weight;
      break;
    }

    // Nothing more can be added
    if(i === sortedByValueItemsArray.length - 1) {
      return packedItems;
    }
  }

  if (availableWeight) {
    return packBackpack(sortedByValueItemsArray, availableWeight, sortedByValueItemsArray, packedItems);
  }

return packedItems
}

// console.log(packBackpack(itemsAvailableToPack, 16));