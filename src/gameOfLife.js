const lib = require('./lib.js');
const IO = require('./game_io.js');

const nextGeneration = function(currGeneration,bounds) {
  let isWithinBounds = lib.isWithin.bind(null, bounds.topLeft, bounds.bottomRight);
  currGeneration = currGeneration.filter(isWithinBounds);
  currGeneration = IO.parseInputs(currGeneration);
  let height = IO.parseBounds(bounds).height;
  let width = IO.parseBounds(bounds).width;
  let world = lib.createWorld(currGeneration, height, width);
  let nextGeneration = lib.evaluateNextGeneration(world);
  return IO.reverseParseInputs(nextGeneration);
}

module.exports = { nextGeneration };
