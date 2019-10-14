const simpleGitPromise = require("simple-git/promise")();
const CLI         = require('clui')
const Spinner     = CLI.Spinner;
const gh          = require('./github');

module.exports = {
    /**
      * This Function create a new remote repository
      * @param {Object} options
      * @returns {Object}
      * @throws It throws err if the repo cannnot be created
    */
    createRemoteRepo: async ( options ) => {
        const github = gh.getInstance();

        const data = {
          name : gh.getRepoName(),
          description : "My personal page",
          private : false
        };
    
        const status = new Spinner('Initializing remote repository...');
        status.start();
    
        try {
          const response = await github.repos.create(data);
          
          return {
             url: response.data.clone_url , 
             name: response.data.name
          }
        } catch(err) {
          throw err;
        } finally {
          status.stop();
        }
    },
     /**
      * This Function set up repository by Initializing local repository
      *  and pushing local repo to remote
      * @param {String} url
      * @returns {String} url
      * @throws It throws err if an error occurred while creating the repository
    */
    setupRepo: async (url) => {
     
        const status = new Spinner('Initializing local repository and pushing to remote...');
        status.start();
        
        try {
            
            await simpleGitPromise.init();
            await simpleGitPromise.addRemote('origin',url);
            // Add all files for commit
            await simpleGitPromise.add('./*')
            await simpleGitPromise.commit('Intial commit')
            // Finally push to online repository
            await simpleGitPromise.push(['-u','origin','master'])

            return url;
        } catch(err) {
            throw err;
        } finally {
          status.stop();
        }
    },
     /**
      * This Function update remote repository by tearing down local cache
      * before pushing to remote.
      * @param {String} url
      * @returns {Boolean}
      * @throws It throws err if an error occurred while creating the repository
    */
    async updateRepo(){
        const status = new Spinner('Pushing to remote repository..');
        status.start();
        try {
          
          await simpleGitPromise.raw(["rm","-r","--cached","."]); //Important to be executed in order to have the updated file on remote repo
          await simpleGitPromise.raw(["add","."]);
          await simpleGitPromise.raw(["commit","-m","My New Changes"]);
          await simpleGitPromise.raw(["push"]);
        
          return true;
      } catch(err) {
          throw err;
      } finally {
        status.stop();
      }
    },
}