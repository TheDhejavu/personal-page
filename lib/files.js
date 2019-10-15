const fs = require('fs');
const Path = require('path');

module.exports = {
  /**
   * @returns {String} 
   */
  getCurrentDirectoryBase : () => {
    return Path.basename(process.cwd());
  },
  /**
   * @returns {Boolean | String}
   */
  makeDirectoryInCwd: ( dirName )=> {
    try {
      const directory = Path.resolve(process.cwd(), dirName);
     
      fs.mkdirSync( directory );
      return directory;
    } catch (err) {
      // console.log(err)
      return false;
    }
  },
  removeDirectoryCwd: ( dirName )=> {
    try {
      const directory = Path.resolve(process.cwd(), dirName);
    
      fs.rmdirSync( directory );
      return directory;
    } catch (err) {
      return false;
    }
  },
  /**
   * @returns {Boolean | String}
   */
  fileExists:(filePath)=>{
    try{
       return fs.existsSync( filePath)
    }catch(error){
      return false;
    }
  },

  /**
   * @params  {*} filePath
   * @returns {Boolean}
   */
  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },
   /**
   * @params  {*} filePath
   * @returns {Boolean | Stream}
   */
  readFromFile: ( filePath )=>{
    try {
      return fs.readFileSync(filePath);
    } catch (err) {
      return false;
    }
  },
   /**
   * @params  {*} filePath
   * @params  {*} json
   * @returns {Boolean}
   */
  writeToFile: (filePath, json)=>{
    try {
      return fs.writeFileSync(filePath, json);
    } catch (err) {
      return false;
    }
  }
};