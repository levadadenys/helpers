// This code defines a graph structure and a function to perform a breadth-first search (BFS) on the graph.
const graphWithMangoSeller = {
  anna: {
    name: 'Anna',
    age: 25,
    isMangoSeller: false,
    friends: ['bob', 'charlie'],
  },
  bob: {
    name: 'Bob',
    age: 30,
    isMangoSeller: false,
    friends: ['anna', 'charlie', 'david'],
  },
  charlie: {
    name: 'Charlie',
    age: 35,
    isMangoSeller: false,
    friends: ['anna', 'bob'],
  },
  david: {
    name: 'David',
    age: 40,
    isMangoSeller: true,
    friends: ['bob', 'jean', 'logan'],
  },
  jean: {
    name: 'Jean',
    age: 28,
    isMangoSeller: false,
    friends: ['david', 'logan'],
  },
  logan: {
    name: 'Logan',
    age: 32,
    isMangoSeller: true,
    friends: ['david', 'jean'],
  },
}

export const breadthFirstSearch =
  (
    graph: typeof graphWithMangoSeller,
    conditionFunction =
    (person: typeof graphWithMangoSeller[keyof typeof graphWithMangoSeller],) => person.isMangoSeller,
    startNodeKey: string
  ) => {
    const queue: string[] = [];
    const visited: Set<string> = new Set();

    queue.push(startNodeKey);
    visited.add(startNodeKey);

    while(queue.length > 0) {
      const currentNodeKey = queue.shift();
      const currentNode = graph[currentNodeKey as keyof typeof graph];

      if (conditionFunction(currentNode)) {
        return currentNode;
      }

      for (const friendKey of currentNode.friends) {
        if(!visited.has(friendKey)) {
          queue.push(friendKey);
          visited.add(friendKey);
        }
      }
    }
  };
