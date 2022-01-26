#! /usr/bin/env node
"use strict";

const readline  = require('readline');
const shell = require("shelljs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Your use case name: ', (name) => {
  if(!name) return rl.close();
  shell.cd('src/use_cases');
  shell.mkdir([name]);
  rl.close();
});