class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

// holds a set of the vertices // edges ONLY
class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
      this.nodes.add(vertex); 
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let node of vertexArray){
      this.addVertex(node);
    };
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    // adjacent values is also a set.
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1)
  };

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);

    for(let node in this.nodes){
      if(node.adjacent.has(vertex)){
        node.adjacent.delete(vertex);
      };
    };
  };

  // this function returns an array of Node values using DFS. Stack.
  depthFirstSearch(start) {
    let stack = [start];
    let returnArr = [];
    // to enure you only visit each adjacent neighbor once
    const visitedNodes = new Set(); 
    visitedNodes.add(start);

    while(stack.length > 0){
      // get the vertex itself
      let node = stack.pop();
      returnArr.push(node.value);

      if(node.value){
        // check if vertex has edges/ neighbors
        for(let neighbor of node.adjacent){
          // if they have not been seen 
          if(!visitedNodes.has(neighbor)){
            // add them to the stack & mark as seen.
            stack.push(neighbor);
            visitedNodes.add(neighbor);
          }
        }
      }
    }
    return returnArr;
  }

  // this function returns an array of Node values using BFS. Queue.
  breadthFirstSearch(start) {
    let queueToSearch = [start];
    let returnArr = [];
    let visitedNodes = new Set();
    visitedNodes.add(start);

    while(queueToSearch.length > 0){
      let currentNode = queueToSearch.shift();
      visitedNodes.add(currentNode);
      returnArr.push(currentNode.value);

      if(currentNode.value){
        for(let neighbor of currentNode.adjacent){
          // very important to add NOT- otherwise, loop
          if(!visitedNodes.has(neighbor)){
              queueToSearch.push(neighbor);
              visitedNodes.add(neighbor);
          }
        }
      }
    }
    return returnArr;
  }
}

module.exports = {Graph, Node}