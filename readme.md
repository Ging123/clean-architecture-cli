# Clean Architecture Cli

## Topics

## How to Use

For use this package you need first install it on your api using this command:
```
npm i clean-architecture-cli-ging -d
```
After that, you must add at your **package.json**, **cac-init** as a script that will  create your clean folder. I'm using **init** as script name for my **cac-init** command.
```
...
{
  "scripts": {
    "init":"cac-init"
  }
}
```
After that you can execute your command to create your clean src folder
```
npm run init
```