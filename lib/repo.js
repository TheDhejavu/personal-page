const simpleGitPromise = require("simple-git/promise")();
const CLI         = require('clui')
const Spinner     = CLI.Spinner;
const gh          = require('./github');

module.exports = {
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
    async updateRepo(){
        const status = new Spinner('Pushing to remote repository..');
        status.start();
        try {
          await simpleGitPromise.raw(["rm","-r","--cached","."]);
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