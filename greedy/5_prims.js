// example 
//     2
// A ------ B
// | \      |
// 4  1\    |3
// |     \  |
// C ------ D
//      5


function prim(graph, start) {
  const visited = new Set([start]);
  const edges = [];

  let mst = [];

  for (const [v, w] of Object.entries(graph[start])) {
    edges.push([w, start, v]);
  }

  while (edges.length) {
    edges.sort((a, b) => a[0] - b[0]);
    const [w, u, v] = edges.shift();

    if (!visited.has(v)) {
      visited.add(v);
      mst.push([u, v, w]);
      for (const [n, weight] of Object.entries(graph[v])) {
        if (!visited.has(n)) edges.push([weight, v, n]);
      }
    }
  }

  return mst;
}


const graphPrim = {
  A:{B:2, C:4, D:1},
  B:{A:2, D:3},
  C:{A:4, D:5},
  D:{A:1, B:3, C:5}
};

console.log(prim(graphPrim, "A")); // [ [ 'A', 'D', 1 ], [ 'A', 'B', 2 ], [ 'A', 'C', 4 ] ]