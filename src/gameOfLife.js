const lib = require('./lib.js');
const IO = require('./game_io.js');

const nextGeneration = function(currGeneration,bounds) {
  let isWithinBounds = isWithin.bind(null, bounds.topLeft, bounds.bottomRight);
  currGeneration = currGeneration.filter(isWithinBounds);
  currGeneration = IO.parseInputs(currGeneration);
  let height = IO.parseBounds(bounds).height;
  let width = IO.parseBounds(bounds).width;
  let world = lib.createWorld(currGeneration, height, width);
  let nextGeneration = lib.evaluateNextGeneration(world);
  return IO.reverseParseInputs(nextGeneration);
}

const isWithin = function(topLeft,bottomRight,position){
  return position[0]>=topLeft[0] && position[0]<=bottomRight[0] && position[1]>=topLeft[1] && position[1]<=bottomRight[1];
}

module.exports = { nextGeneration };
