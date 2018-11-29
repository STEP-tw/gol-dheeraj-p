const lib = require('./lib.js');
const IO = require('./game_io.js');

const nextGeneration = function(currGeneration,bounds) {
  let isWithinBounds = lib.isWithin.bind(null, bounds.topLeft, bounds.bottomRight);
  currGeneration = currGeneration.filter(isWithinBounds);
  currGeneration = IO.parseInputs(currGeneration);
  let {height, width} = IO.parseBounds(bounds);
  let world = lib.createWorld(currGeneration, height, width);
  let nextGeneration = lib.evaluateNextGeneration(world);
  return IO.reverseParseInputs(nextGeneration);
}

module.exports = { nextGeneration };
