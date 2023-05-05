// Write a function, undirectedPath, that takes in an array of edges for an undirected graph and two nodes (nodeA, nodeB). The function should return a boolean indicating whether or not there exists a path between nodeA and nodeB.
// test_00:
// const edges = [
//   ['i', 'j'],
//   ['k', 'i'],
//   ['m', 'k'],
//   ['k', 'l'],
//   ['o', 'n']
// ];

// undirectedPath(edges, 'j', 'm'); // -> true

//Attempt
const undirectedPath1 = function(edges, node1, node2){
	let hash = gethash(edges)
	return traversegraph(new Set(),hash,node1,node2)
}

const gethash = function(edges){
	let hash = {}
	for(let i=0;i<edges.length;i++){
		if(edges[i][0] in hash){
			hash[edges[i][0]].push(edges[i][1])
    }else{
      hash[edges[i][0]] = [edges[i][1]]
    }
    if(edges[i][1] in hash){
			hash[edges[i][1]].push(edges[i][0])
    }else{
      hash[edges[i][1]] = [edges[i][0]]
    }
  }
  return hash
}

const traversegraph = function(visited,hash,node1,node2){
	let neighbors = hash[node1]
	let route = false
	visited.push(node1)
	for(let i = 0; i< neighbors.length;i++){
		if(neighbors[i] = node2){
			route = true
			break
		}
		visited.push(neighbors[i])
		if(visited.length == hash.keys.length - 1){
			return route
    }else{
			route = traversegraph(visited,hash,neighbor[i],node2)
		}
  }
  return route
}

//Solution
const hasPath = (graph, src, dst, visited) => {
  if (src === dst) return true;
  if (visited.has(src)) return false;
  visited.add(src);
  
  for (let neighbor of graph[src]) {
    if (hasPath(graph, neighbor, dst, visited) === true) {
      return true;    
    }
  }
  
  return false;
};

const buildGraph = (edges) => {
  const graph = {};
  
  for (let edge of edges) {
    const [ a, b ] = edge;
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  
  return graph;
};

const undirectedPath = (edges, nodeA, nodeB) => {
  const graph = buildGraph(edges);
  return hasPath(graph, nodeA, nodeB, new Set());
};

