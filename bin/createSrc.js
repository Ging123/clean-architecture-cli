#! /usr/bin/env node
"use strict";

const showOnTerminal = require('../util/showOnTerminalCommand');
const createStringWithCommands = require('../util/createStringWithCommands');
const shell = require("shelljs");

const createSrcStructure = createStringWithCommands({
  creatingMessage:showOnTerminal('Creating your src', 'Yellow'),
  createSrcFolder:'mkdir src',
  enterInSrcFolder:'cd src',
  createConfigFolder:'mkdir configs',
  createExternalFolder:'mkdir externals',
  createUseCasesFolder:'mkdir use_cases',
  createMiddlewaresFolder:'mkdir middlewares',
  createModelsFoder:'mkdir models',
  createRepositoriesFolder:'mkdir repositories',
  createUtilFolder:'mkdir util',
  createRoutesFolder:'mkdir routes',
  concluedMessage:showOnTerminal('Your src was created', 'Green')
});

shell.exec(createSrcStructure);