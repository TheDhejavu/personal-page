const simpleGit         = require('simple-git')();
const simpleGitPromise = require("simple-git/promise")(__dirname);
const CLI         = require('clui')
const Spinner     = CLI.Spinner;
const gh          = require('./github');

module.exports = {
    createRemoteRepo: async ( options ) => {
      
        const isRepo = await simpleGitPromise.checkIsRepo();
        if(isRepo) return;
        const github = gh.getInstance();

        const data = {
          name : gh.getRepoName(),
          description : "My personal page",
          private : false
        };
    
        const status = new Spinner('Creating remote repository...');
        status.start();
    
        try {
          const response = await github.repos.create(data);
         
          return response.data.clone_url;
        } catch(err) {
          throw err;
        } finally {
          status.stop();
        }
    },
    setupRepo: async (url) => {
     
        // const status = new Spinner('Initializing local repository and pushing to remote...');
        // status.start();
    
        try {
            const isRepo = await simpleGitPromise.checkIsRepo()
            if(!isRepo){
              await simpleGitPromise.init();
              await simpleGitPromise.addRemote('origin',url);
            }
            // Add all files for commit
            await simpleGitPromise.add('.')
            await simpleGitPromise.commit('Intial commit by simplegit')
            // Finally push to online repository
            await simpleGitPromise.push('origin','master')

            return url;
        } catch(err) {
            throw err;
        } finally {
          // status.stop();
        }
    },
}