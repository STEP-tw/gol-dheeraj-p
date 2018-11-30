const createGrid = function(height, width){
  let grid = new Array(height).fill(undefined);
  return grid.map((cell)=>new Array(width).fill(0));
}

const createWorld = function(aliveCells, height, width){
  let world = createGrid(height, width);
  for(let aliveCell of aliveCells){
    world[aliveCell.row][aliveCell.col] = 1;
  }
  return world;
}

const cartesianProductOf = function(firstSet, secondSet){
  let result = new Array();
  for(let firstSetElement of firstSet){
    for(let secondSetElement of secondSet){
      result.push([firstSetElement, secondSetElement]);
    }
  }
  return result;
}

const findNeighbourDeltas = function(){
  let rowDeltaSet = [0,1,-1];
  let columnDeltaSet = [0,1,-1];
  return cartesianProductOf(rowDeltaSet, columnDeltaSet).slice(1); //slice(1) to remove delta (0,0)
}

const addDelta = function(cellPosition, delta){
  let row = cellPosition.row + delta[0];
  let col = cellPosition.col + delta[1];
  return {row, col};
}

const findNeighbours = function(row, col, grid){
  let neighbourDeltas = findNeighbourDeltas();
  let cellPosition = {row, col};
  let addDeltaToCell = addDelta.bind(null, cellPosition); 
  let neighbours = neighbourDeltas.map(addDeltaToCell); 
  return neighbours.filter((cell) => {
    return grid[cell.row] != undefined && grid[cell.row][cell.col] != undefined ;
  });
}

const countAliveNeighbours = function(row, col, grid){
  let neighbours = findNeighbours(row, col, grid);
  return neighbours.reduce((neighboursCount, currentNeighbour) => {
    return neighboursCount + grid[currentNeighbour.row][currentNeighbour.col];
  },0);
} 

const getCellRules = function(cell){
  const aliveCellRules = [0,0,1,1,0,0,0,0,0];
  const deadCellRules = [0,0,0,1,0,0,0,0,0];
  const allCellRules = [deadCellRules, aliveCellRules];
  return allCellRules[cell];
}

const applyRules = function(cell, grid){
  let cellState = grid[cell.row][cell.col];
  let cellRules = getCellRules(cellState);
  let aliveNeighboursCount = countAliveNeighbours(cell.row, cell.col, grid);
  return cellRules[aliveNeighboursCount];
}

const getAliveCells = function(world){
  let aliveCells =  world.filter( cell => cell.state );
  return aliveCells.map(cell => {
    return {row: cell.row, col: cell.col};
  });
}

const evaluateNextGeneration = function(grid){
  let nextGenWorld = new Array();
  for(let row=0; row<grid.length; row++){
    for(let col=0; col<grid[row].length; col++){
      let cell = {row, col};
      let nextGenCell = applyRules(cell, grid);
      nextGenWorld.push({row, col, state: nextGenCell});
    }
  }
  return getAliveCells(nextGenWorld);
}

const evaluateNthGeneration = function(currentGeneration, generationCount, height, width){
  let nthGeneration = currentGeneration;
  while(generationCount){
    let currentWorld = createWorld(nthGeneration, height, width);
    nthGeneration = evaluateNextGeneration(currentWorld);
    generationCount--;
  }
  return nthGeneration;
}

const isGreaterEqualTo = function(leftOperand, rightOperand){
  return leftOperand >= rightOperand;
}

const isWithin = function(topLeft, bottomRight, positionToCheck){
  let row = positionToCheck[0];
  let col = positionToCheck[1];
  let isRowInBound = isGreaterEqualTo(row,topLeft[0]) && isGreaterEqualTo(bottomRight[0], row); 
  let isColInBound = isGreaterEqualTo(col,topLeft[1]) && isGreaterEqualTo(bottomRight[1],col);
  return isRowInBound && isColInBound;
}

exports.createGrid = createGrid;
exports.createWorld = createWorld;
exports.findNeighbours = findNeighbours;
exports.countAliveNeighbours = countAliveNeighbours;
exports.evaluateNextGeneration = evaluateNextGeneration;
exports.evaluateNthGeneration = evaluateNthGeneration;
exports.isWithin = isWithin;
exports.cartesianProductOf = cartesianProductOf;
