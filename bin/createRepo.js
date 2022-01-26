#! /usr/bin/env node
"use strict";

const turnFirstLetterUpperCase = require('../util/turnFirstLetterUpperCase');
const readline  = require('readline');
const shell = require("shelljs");
const { exec } = require("child_process");
var repoName = '';
var repoNameForClass = '';
var modelFile = '';
var modelClass = '';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('Your repository name: ', (name) => {
  if(!name) return rl.close();
  setRepoName(name);
  enterInRepositoriesFolder();
  createRepositoryFile();
  addTextToFile();
  rl.close();
});

const setRepoName = name => {
  repoName = `${name}Repository`;
  repoNameForClass = turnFirstLetterUpperCase(repoName);
  modelFile = `${name}Model`;
  modelClass = turnFirstLetterUpperCase(modelFile);
}

const enterInRepositoriesFolder = () => shell.cd('src/repositories/');

const createRepositoryFile = () => shell.touch(`${repoName}.ts`);

function addTextToFile() {
  const modelExists = verifyIfModelExists();
  if(modelExists) importModel();
  shell.exec(`echo class ${repoNameForClass} { >> ${repoName}.ts`);
  shell.exec(`echo } >> ${repoName}.ts`);
  shell.exec(`echo export default ${repoNameForClass}; >> ${repoName}.ts`);
}

function verifyIfModelExists() {
  shell.cd('../models');
  const modelExists = shell.find([`${modelFile}.ts`]);
  shell.cd('../repositories');
  return modelExists.stdout
}

function importModel() {
  shell.exec(`echo import ${modelClass} from '../models/${modelFile}' >> ${repoName}.ts`);
}