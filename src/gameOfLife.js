const lib = require('./lib.js');
const IO = require('./game_io.js');

const nextGeneration = function(currGeneration,bounds) {
  currGeneration = currGeneration.map((cell) => [cell[0] - bounds.topLeft[0], cell[1] - bounds.topLeft[1]]);
  currGeneration = IO.parseInputs(currGeneration);
  let {height, width} = IO.parseBounds(bounds);
  let world = lib.createWorld(currGeneration, height, width);
  let nextGeneration = lib.evaluateNextGeneration(world);
  return nextGeneration.map((cell) => {
    return [cell.row + bounds.topLeft[0], cell.col + bounds.topLeft[1]];
  });
}

module.exports = { nextGeneration };
