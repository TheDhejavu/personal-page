const {expect} = require('chai');
const files = require("../../lib/files");

describe('File Handler', function() {

  this.timeout(5000);
  
  describe("Positive Test Cases", function() {
    const folderName = "template";
    const folderPath = process.cwd()+"/"+folderName;
    const currentCwd = "personal-page";
    const configFile = "page.config.json";
    const configFilePath = process.cwd()+"/app/src/data/"+configFile;

    it('Should Create a new directory in working directory & return new directory path', function() {
      const dir = files.makeDirectoryInCwd(folderName)
      expect(dir).to.equal(folderPath)
    });
    
    
    it('Should return true if folder exists in directory', async function() {
      const exist = await files.directoryExists(folderName);
      expect(exist).to.equal(true)
    });
  
    
    it('Should return current working directory base', async function() {
      const base = await files.getCurrentDirectoryBase();
      expect(base).to.equal(currentCwd)
    });
    
    
    it('Should return True if file exists ', async function() {
      const data = await files.fileExists(configFilePath);
      expect(data).to.equal(true)
    });

    it('Should read from page.config.json file', async function() {
      const data = await files.readFromFile(configFilePath);
      expect(data).to.not.equal(false)
    });

    it('Should read & write to page.config.json', async function() {
      const data = await files.readFromFile(configFilePath);
      const json = await files.writeToFile(configFilePath, data);
      expect(json).to.not.equal(false)
    });
  
    this.afterAll(function( done ) {
      files.removeDirectoryCwd(folderName)
      done();
    });

  })


  describe("Negative Test Cases", function() {
    
    it('Should return false if folder does not exist in directory', async function() {
      const exist = await files.directoryExists("C:/Users/invalid-dir");
      expect(exist).to.equal(false)
    });
   
  })
  
})