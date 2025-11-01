class DSU {
    constructor(n) {
        this.parent = [...Array(n).keys()]
    }

    find(x){
        if(this.parent[x] === x) return x;
        return this.parent[x] = this.find(this.parent[x]);
    }

    union(x, y){
        const px = this.find(x), py = this.find(y);
        if(px !== py) this.parent[py] = px;
    }
}

function kruskal(nodes, edges){
    edges.sort((a, b) => a[2] - b[2])
    const dsu = new DSU(nodes.length)
    const mst = []

    for(const [u, v, w] of edges){
        if(dsu.find(u) !== dsu.find(v)){
            dsu.union(u, v)
            mst.push([u, v, w])
        }
    }

    return mst;
}

const edges = [
  [0,1,2],[0,2,4],[0,3,1],
  [1,3,3],[2,3,5]
];

console.log(kruskal([0,1,2,3], edges)); // [ [ 0, 3, 1 ], [ 0, 1, 2 ], [ 0, 2, 4 ] ]