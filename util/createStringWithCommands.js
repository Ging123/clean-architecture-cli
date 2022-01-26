"use strict";

module.exports = (commands) => {
  let stringOfCommand = '';
  let index = 0;
  for(const key in commands) {
    if(index === 0) stringOfCommand += commands[key];
    else stringOfCommand += ` && ${commands[key]}`;
    index+=1;
  }
  return stringOfCommand;
}