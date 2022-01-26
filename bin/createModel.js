#! /usr/bin/env node
"use strict";

const turnFirstLetterUpperCase = require('../util/turnFirstLetterUpperCase');
const readline  = require('readline');
const shell = require("shelljs");
var modelName = '';
var modelNameForClass = '';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Your model name: ', (name) => {
  if(!name) return rl.close();
  setModelName(name);
  enterInModelFolder();
  createModelFile();
  addTextToFile();
  rl.close();
});

const setModelName = name => {
  modelName = `${name}Model`;
  modelNameForClass = turnFirstLetterUpperCase(modelName)
}

const enterInModelFolder = () => shell.cd('src/models/');

const createModelFile = () => shell.touch(`${modelName}.ts`);

function addTextToFile() {
  shell.exec(`echo class ${modelNameForClass} { >> ${modelName}.ts`);
  shell.exec(`echo } >> ${modelName}.ts`);
  shell.exec(`echo export default ${modelNameForClass}; >> ${modelName}.ts`);
}