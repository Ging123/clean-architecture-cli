#! /usr/bin/env node
"use strict";

const readline  = require('readline');
const shell = require("shelljs");
const showOnTerminalCommand = require('../util/showOnTerminalCommand');
const turnFirstLetterUpperCase = require('../util/turnFirstLetterUpperCase');
var className = ''

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Your use case folder name: ', (folder) => {
  if(!folder) return rl.close();
  if(!useCaseExists(folder)) return rl.close();
  rl.question('Your use case name: ', (name) => {
    if(!name) return rl.close();
    createUseCase(folder, name);
    rl.question('Create controller(y/n):', (choice) => {
      if(choice !== 'y') return rl.close();
      rl.question('Request type of the controller: ', (type) => {
        if(type === 'get' || type === 'post' || type === 'put' || type === 'delete') {
          createController(type, folder);
        }
        else {
          showOnTerminalCommand('Controller type is not valid', 'Red');
        }
        rl.close();
      });
    });
  });
});

function useCaseExists(folder) {
  shell.cd('src/use_cases');
  const result = shell.find([folder]);
  const userExists = result.stdout;
  if(!userExists) showOnTerminalCommand('This use case doesnt exists', 'Red');
  return userExists;
}

function createUseCase(useCasefolder, name) {
  const nameWithFirstLetterUpperCase = turnFirstLetterUpperCase(name)
  const folderNameWithFirstLetterUpperCase = turnFirstLetterUpperCase(useCasefolder);
  className = folderNameWithFirstLetterUpperCase + nameWithFirstLetterUpperCase;
  className += 'UseCase';
  shell.cd(useCasefolder);
  shell.mkdir([name]);
  shell.cd(name);
  shell.touch('useCase.ts');
  shell.exec(`echo class ${className} { >> useCase.ts`);
  shell.exec('echo } >> useCase.ts');
  shell.exec(`echo export default ${className} >> useCase.ts`);
} 

function createController(type, folderName) {
  shell.touch('controller.ts');
  shell.exec("echo import express from 'express'; >> controller.ts");
  shell.exec(`echo import ${className} from './useCase'; >> controller.ts`);
  shell.exec('echo const route = express.Router(); >> controller.ts');
  shell.exec(`echo const ${folderName} = new ${className}(); >> controller.ts`);
  shell.exec(`echo route.${type}('/', async () =^> {}); >> controller.ts`);
  shell.exec(`echo module.exports = route; >> controller.ts`);
}