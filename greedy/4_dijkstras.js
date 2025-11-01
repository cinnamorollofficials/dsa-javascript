// example
// A --1--> B --2--> D
// |        \
// 4         3
// |          \
// v           v
// C ----1-->  E


function dijkstra(graph, start) {
    const dist = {};
    const visited = new Set();

    Object.keys(graph).forEach(v => dist[v] = Infinity)
    dist[start] = 0;

    while (visited.size < Object.keys(graph).length) {
        let node = Object.keys(dist)
            .filter(v => !visited.has(v))
            .reduce((a, b) => dist[a] < dist[b] ? a : b);

        visited.add(node);

        for (const [neighbour, weight] of Object.entries(graph[node])) {
            const newDist = dist[node] + weight;
            if (newDist < dist[neighbour]) dist[neighbour] = newDist;
        }
    }

    return dist;
}

const graph = {
    "A": { "B": 1, "C": 4 },
    "B": { "D": 2, "E": 3 },
    "C": { "E": 1 },
    "D": {},
    "E": { "D": 1 }
};

console.log(dijkstra(graph, "A")) // { A: 0, B: 1, C: 4, D: 3, E: 4 }