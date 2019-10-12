const octokit     = require('@octokit/rest')();
const Configstore = require('configstore');
const pkg         = require('../package.json');
const _           = require('lodash');
const CLI         = require('clui');
const Spinner     = CLI.Spinner;
const conf = new Configstore(pkg.name);


module.exports = {
    /**
     * @returns {Object}
    */
    getInstance: () => {
      return octokit;
    },
    /**
     * @params {String}
    */
    githubAuth : (token) => {
        octokit.authenticate({
          type : 'oauth',
          token : token
        });
    },
    /**
      * @returns {String}
    */
    getStoredGithubToken : () => {
      return conf.get('github.token');
    },
    getStoredUsername : () => {
        return conf.set('github.username')
    }, 
    getRepoName : () => {
        return `${conf.get('github.username')}.github.io`;
    }, 
    /**
      * Authenticate User using github basic authentication 
      * exposed via octokit.. 
      * @params {Object}
    */
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
    /**
     * Register a new github personal token for user
      * @params {Object}
    */
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