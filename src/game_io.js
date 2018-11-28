const parseInputs = function(userInputs){
  let parsedUserInputs = userInputs.map(userInput => {
    return {row: userInput[0], col: userInput[1]};
  });
  return parsedUserInputs;
}

const parseBounds = function(bounds){
  let height = bounds.bottomRight[0] - bounds.topLeft[0];
  let width = bounds.bottomRight[1] - bounds.topLeft[1];
  return {height,width};
}

const reverseParseInputs = function(parsedInputs){
  return parsedInputs.map(parsedInput =>{
    return [parsedInput.row, parsedInput.col];
  });
}

const generatePrintableGrid = function(grid){
  return grid.map(row => '|' + row.join("|") + '|');
}

exports.parseInputs = parseInputs;
exports.generatePrintableGrid = generatePrintableGrid;
exports.parseBounds = parseBounds;
exports.reverseParseInputs = reverseParseInputs;
