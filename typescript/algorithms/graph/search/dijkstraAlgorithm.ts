const weighedGraph = {
  A: { B: 7, C: 8 },
  B: { A: 7, F: 2 },
  C: { A: 8, F: 6, G: 4 },
  D: { F: 8 },
  E: { H: 1 },
  F: { B: 2, C: 6, D: 8, G: 9, H: 3 },
  G: { C: 4, F: 9 },
  H: { E: 1, F: 3 },
}


const dijkstra = (graph: Record<string, Record<string, number>>, start: string) => {
  const distances: Record<string, number> = {};
  const visited: Record<string, boolean> = {};
  const previous: Record<string, string | null> = {};
  const nodes = Object.keys(graph);

  nodes.forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
  });

  distances[start] = 0;

  while (nodes.length) {
    nodes.sort((a, b) => distances[a] - distances[b]);
    const closestNode = nodes.shift()!;
    if (distances[closestNode] === Infinity) {
      // console.log('All remaining nodes are inaccessible from start');
      break;
    }

    for (const neighbor in graph[closestNode]) {
      const alt = distances[closestNode] + graph[closestNode][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = closestNode;
      }
    }
    visited[closestNode] = true;
  }

  return { distances, previous };
}

// console.log(dijkstra(weighedGraph, 'A'));
