const octokit     = require('@octokit/rest')();
const Configstore = require('configstore');
const pkg         = require('../package.json');
const _           = require('lodash');
const CLI         = require('clui');
const Spinner     = CLI.Spinner;
const files = require("./files");
const conf = new Configstore(pkg.name);


module.exports = {

    getInstance: () => {
      return octokit;
    },
    githubAuth : (token) => {
        octokit.authenticate({
          type : 'oauth',
          token : token
        });
    },
    getStoredGithubToken : () => {
      // conf.delete('github.token');
      return conf.get('github.token');
    },
    getStoredUsername : () => {
        // conf.set('github.username', "thedhejavu");
        return conf.set('github.username')
    }, 
    getRepoName : () => {
        // conf.set('github.username', "thedhejavu");
        return `${conf.get('github.username')}.github.io`;
    }, 
    setGithubCredentials : async ( credentials ) => {
        
        octokit.authenticate(
          _.extend(
            {
              type: 'basic',
            },
            credentials
          )
        );
    },
  
    registerNewToken : async ( options ) => {
        const status = new Spinner('Authenticating you, please wait...');
        status.start();
    
        try {
          const response = await octokit.authorization.create({
            scopes: ['user', 'public_repo', 'repo', 'repo:status'],
            note: 'personal-page, the command-line tool for creating simple static but customizable personal'
          });
          
          const token = response.data.token;
          if(token) {
            conf.set('github.token', token);
            // save username and repo name
            conf.set('github.username', options.username);
            return token;
          } else {
            throw new Error("Missing Token","GitHub token was not found in the response");
          }
        } catch (err) {
          throw err;
          
        } finally {
          status.stop();
        }
    },
  }