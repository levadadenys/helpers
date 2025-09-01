const availableSets: { [key: string]: Set<string> } = {
  kone: new Set(['id', 'nv', 'ut']),
  ktwo: new Set(['wa', 'id', 'mt']),
  kthree: new Set(['or', 'nv', 'ca']),
  kfour: new Set(['nv', 'ut']),
  kfive: new Set(['ca', 'az']),
}

const needToCover = new Set(['id', 'nv', 'ut', 'wa', 'mt', 'or', 'ca', 'az']);

export const getGreedySetCover = (
  sets: { [key: string]: Set<string> },
  toCover: Set<string>,
  finalSets: string[] = [],
) => {
  while(toCover.size > 0) {
    let bestSetKey: string | null = null;
    let elementsCoveredByBestSet: Set<string> = new Set();

    for (const [setKey, set] of Object.entries(sets)) {
      // .intersection method is not yet available widely
      // const currentSetIntersection = toCover.intersection(set)

      const currentSetIntersection = new Set(
        [...toCover].filter((element) => set.has(element))
      );

      if (currentSetIntersection.size > elementsCoveredByBestSet.size) {
      elementsCoveredByBestSet = currentSetIntersection;
      bestSetKey = setKey;
      }
    }

    if (!bestSetKey) {
      break; // No more sets can cover remaining elements
    }

    finalSets.push(bestSetKey);
    delete sets[bestSetKey];
    for(const element of elementsCoveredByBestSet) {
      toCover.delete(element);
    }
  }
  return finalSets;
}

console.log(getGreedySetCover(availableSets, needToCover));
