const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase : () => {
    return path.basename(process.cwd());
  },
  makeDirectoryInCwd: ( dirName )=> {
    try {
      const directory = `${process.cwd()}/${dirName}`;
      fs.mkdirSync( directory );
      return directory;
    } catch (err) {
      return false;
    }
  },
  fileExists:(filePath)=>{
    try{
       return fs.existsSync( filePath)
    }catch(error){
      return false;
    }
  },
  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },
  readFromFile: ( filePath )=>{
    try {
      return fs.readFileSync(filePath);
    } catch (err) {
      return false;
    }
  },
  writeToFile: (filePath, json)=>{
    try {
      return fs.writeFileSync(filePath, json);
    } catch (err) {
      return false;
    }
  }
};