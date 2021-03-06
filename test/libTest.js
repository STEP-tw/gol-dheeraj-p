const {equal, deepEqual} = require("assert");
const {
  createGrid,
  createWorld,
  findNeighbours,
  countAliveNeighbours,
  evaluateNextGeneration,
  evaluateNthGeneration,
  cartesianProductOf
} = require("../src/lib.js");

describe("createGrid", function(){
  it("should return empty array for 0x0 size", function(){
    deepEqual(createGrid(0,0), []);
  });
  it("should return grid of 1x1 size", function(){
    deepEqual(createGrid(1,1),[[0]]);
  });
  it("should return grid of 3x2 size", function(){
    deepEqual(createGrid(3,2),[[0,0],[0,0],[0,0]]);
  });
});

describe("createWorld", function(){
  it("should return 2D array containing all 0's for empty input array", function(){
    deepEqual(createWorld([], 1,1), [[0]]);
  });
  it("should return 2D array containing all 1's for input array containing positions for alive cells", function(){
    deepEqual(createWorld([{row: 0, col:0}], 1, 1), [[1]]);
  });
  it("should return 2D array containing 1's for input array containing positions for alive cells", function(){
    deepEqual(createWorld([{row: 0, col:0}], 2, 2), [[1,0],[0,0]]);
  });
});

describe("findNeighbours", function(){
  it("should return all neighbours for 3x3 world", function(){
    let expectedOut = [ { row: 1, col: 2 },
      { row: 1, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 0 } ];
    deepEqual(findNeighbours(1,1,createGrid(3, 3)), expectedOut);
  });
  it("should return all neighbours for 2x2 world", function(){
    let expectedOut =  [ { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 } ];
    deepEqual(findNeighbours(0,0,createGrid(2, 2)), expectedOut);
  });
});

describe("countAliveNeighbours", function(){
  it("should return 0 for world containing all dead cells", function(){
    deepEqual(countAliveNeighbours(0, 0, createGrid(5)), 0);
  });
  it("should return number for alive neighbours cells", function(){
    let world = createWorld([{row:0,col:1},{row:1,col:0},{row:1,col:1}],3);
    deepEqual(countAliveNeighbours(0, 0, world), 3);
    world = createWorld([
      {row: 0, col: 0},
      {row: 0, col: 2},
      {row: 1, col: 1},
      {row: 2, col: 0},
      {row: 2, col: 2}], 3);
    deepEqual(countAliveNeighbours(0, 0, world), 1);
    deepEqual(countAliveNeighbours(0, 1, world), 3);
  });
});

describe("evaluateNextGeneration", function(){
  it("should return empty world for empty world", function(){
    deepEqual(evaluateNextGeneration(createGrid(0, 0)), []);
  });
  it("should return next generation world for non empty world", function(){
    let world = createWorld([
      {row: 0, col: 0},
      {row: 0, col: 2},
      {row: 1, col: 1},
      {row: 2, col: 0},
      {row: 2, col: 2}], 3, 3);
    let expectedNextGen = [{row: 0,col: 1},{row: 1,col: 0},{row: 1,col: 2},{row: 2,col: 1}];
    deepEqual(evaluateNextGeneration(world), expectedNextGen);
  });
});

describe("evaluateNthGeneration", function(){
  it("should return empty world for empty world at any generation", function(){
    deepEqual(evaluateNthGeneration(createGrid(0, 0), 0), []);
  });
  it("should return nth generation world for non empty world", function(){
    let currentGeneration = [{row: 0,col: 0},{row: 0,col: 2},{row: 1,col: 1},{row: 2,col: 0},{row: 2,col: 2}];
    let expectedOutput = [{row: 0,col: 1},{row: 1,col: 0},{row: 1,col: 2},{row: 2,col: 1}];
    deepEqual(evaluateNthGeneration(currentGeneration, 1, 3,3), expectedOutput);
    currentGeneration = [{row: 0,col: 0},
      {row: 0,col: 1},
      {row: 0,col: 2},
      {row: 1,col: 0},
      {row: 1,col: 1},
      {row: 1,col: 2},
      {row: 2,col: 0},
      {row: 2,col: 1},
      {row: 2,col: 2}];
    expectedOutput = [];
    deepEqual(evaluateNthGeneration(currentGeneration, 2, 3, 3), expectedOutput);
    deepEqual(evaluateNthGeneration(currentGeneration, 3,3, 3), expectedOutput);
  });
});

describe("cartesianProductOf", function(){
  it("Should return empty set for cartesian product of two empty sets", function(){
    deepEqual(cartesianProductOf([],[]), []);
  });

  it("Should return cartesian product of two non empty sets of same number of elements", function(){
    deepEqual(cartesianProductOf([0],[1]), [[0,1]]);
    deepEqual(cartesianProductOf([0,1],[1,0]), [[0,1],[0,0],[1,1],[1,0]]);
  });

  it("Should return cartesian product of two non empty sets where first set has more elements than second", function(){
    deepEqual(cartesianProductOf([0,1],[1]), [[0,1],[1,1]]);
  });

  it("Should return cartesian product of two non empty sets where second set has more elements than first", function(){
    deepEqual(cartesianProductOf([1],[1,0]), [[1,1],[1,0]]);
  });
});
