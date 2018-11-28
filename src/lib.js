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

const findNeighbours = function(row, col, grid){
  let neighbours = new Array();
  neighbours.push({row, col : col + 1});
  neighbours.push({row : row + 1, col : col + 1});
  neighbours.push({row : row + 1, col});
  neighbours.push({row : row + 1, col : col - 1});
  neighbours.push({row, col : col - 1});
  neighbours.push({row : row - 1, col : col - 1});
  neighbours.push({row : row -1 , col});
  neighbours.push({row : row - 1, col : col + 1});

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

const evaluateNextGeneration = function(grid){
  let nextGenWorld = new Array();
  for(let row=0; row<grid.length; row++){
    for(let col=0; col<grid[row].length; col++){
      let cell = grid[row][col];
      let cellRules = getCellRules(cell);
      let aliveNeighboursCount = countAliveNeighbours(row, col, grid);
      let nextGenCell = cellRules[aliveNeighboursCount];
      if(nextGenCell == 1){
        nextGenWorld.push({row, col});
      }
    }
  }
  return nextGenWorld;
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

exports.createGrid = createGrid;
exports.createWorld = createWorld;
exports.findNeighbours = findNeighbours;
exports.countAliveNeighbours = countAliveNeighbours;
exports.evaluateNextGeneration = evaluateNextGeneration;
exports.evaluateNthGeneration = evaluateNthGeneration;
