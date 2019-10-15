const chalk = require('chalk');
const pkg    = require('../package.json');
const path =require('path');
const figlet = require("figlet");
const clear = require("clear");
const fs = require('fs-extra');
const execa = require("execa");
const CLI         = require('clui');
const Spinner     = CLI.Spinner;
const Listr = require('listr');
const { projectInstall }  = require( 'pkg-install');
const files = require("./files");
const github = require("./github");
const exec = require('child_process').exec;
const repo = require("./repo");
const Configstore = require('configstore');
const conf = new Configstore(pkg.name);
const util = require("util");
const execPromise = util.promisify(exec);

/**
  * @action { page -h | page --help}
*/
export function runHelp(){
    const help = `
    These are common Page commands used in various situations:

    -v --version        Check package version
    -h --help           Check for command help
    create              Create a new personal page
    edit                Edit an existing personal page
    remove              Remove an existing personal page
    reset conf          Reset an existing personal page configuration 
    deploy              Deploy a new personal page to github pages
    serve               Serve your new personal page locally`;
    
    console.log( help );
    process.exit();
}


export function runVersion(){
    console.log(chalk.green(`personal-page: ${ pkg.version}` ));
    process.exit();
}

/**
  * This Function initialize's git 
  * @param {Object} options
  * @returns {Undefined | Promise}
*/
async function initGit(options) {
    const result = await execa('git', ['init'], {
      cwd: options.targetDirectory,
    });
    if (result.failed) {
      return Promise.reject(new Error('Failed to initialize git'));
    }
    return;
}

/**
  * This Function adds existing or new information to page the
  * generated via the page.config.json file
  * @param {Object} answers
  * @param {*} targetDirectory
  * @returns {Boolean}
  * @throws - throw an Error if the process coudn't be completed
*/
async function addPageInformation({ answers, targetDirectory }){
 
  try{
    if(answers.home.avatar && answers.home.avatar !== "public/assets/avatar.png"){
      await fs.copySync(answers.home.avatar, targetDirectory+"/public/assets/avatar.png");
    }
    answers.home.avatar = (answers.home.avatar )? "public/assets/avatar.png" : null;
    answers = JSON.stringify(answers);
    return await files.writeToFile(targetDirectory+"/src/data/page.config.json", answers);
  }catch(error){
    throw(error)
  }
};

/**
  * This Function copy the template file from the app folder
  * @param {Object} options
*/
async function copyTemplateFiles(options) {
 return await fs.copySync(options.templateDirectory, options.targetDirectory);
}

/**
  * This Function copy the template file from the app folder
  * @param {Object} options
  * @returns {Boolean}
*/

async function updateConfigFile({ answers }){
  let targetDirectory = process.cwd();
  let targetFile = `${targetDirectory}/src/data/page.config.json`;
  let config = await files.readFromFile( targetFile );
  config = JSON.parse(config);
  answers = {
    ...config,
    ...answers
  }
  return await addPageInformation({ answers, targetDirectory })
}

/**
  * This Function creates the project and install the
  * appropriate dependencies
  * @param {Object} options
  * @returns {Boolean}
*/

export async function createProject(options){
    const targetDirectory = await files.makeDirectoryInCwd( options.folderName );
    options = {
        ...options,
        targetDirectory
    };
     
    const templateDir = path.join(__dirname,"../app");
    options.templateDirectory = templateDir;
    
    const tasks = new Listr([
        {
          title: 'Create page files',
          task: () => copyTemplateFiles(options),
        },
        {
          title: "Add page information",
          task: ()=> addPageInformation( options )
        },
        {
          title: 'Initialize git',
          task: () => initGit(options)
        },
        {
          title: 'Install dependencies',
          task: () =>
            projectInstall({
              cwd: options.targetDirectory,
            })
        },
    ]);
     
    try{
        await tasks.run();
        console.log(
          '🎉   Successfully created %s', 
           chalk.yellow.bold( options.folderName)
        );

        if(options.folderName){
          process.chdir(options.folderName);
          await runBuild();
          await runServe( options );
        }else{
          console.log('👇 Execute the following command to preview your page');
          console.log(
              chalk.white.bold(`  cd  %s `), 
              chalk.yellow.bold( options.folderName )
          );
          console.log(
            chalk.white.bold(`  page`)+" serve"
          );
        }
        return true;
    }catch( err){
      throw(err)
    }
}


/**
  * This Function update the existing page 
  * @param {Object} options
  * @returns {Boolean}
*/
export async function updateProject( options ){
  const tasks = new Listr([
      {
        title: 'Update page information',
        task: () => updateConfigFile(options),
      },
  ]);
  
  try{
      
      options.folderName = options.folderName || files.getCurrentDirectoryBase()
      await tasks.run();
      await runBuild();
      console.log(
        '🎉   Successfully updated %s', 
        chalk.yellow.bold( options.folderName)
      );
      return true;
  }catch( err){
    return false;
  }
}
/**
  * This Function serve the created template locally
  * @param {String} folderName
*/
export async function runServe( { folderName }){
  try {
  
    if(!folderName){
      folderName = files.getCurrentDirectoryBase();
    }
    
    const childProcess = exec('npm run serve',
    ( error, stdout, stderr ) =>
    {
        if( error )
        {
            // This won't show up until the process completes:
            console.log( '[ERROR]: "' + error.name + '" - ' + error.message );
            console.log( '[STACK]: ' + error.stack );

            console.log( stdout );
            console.log( stderr );
            return;
        }

        // Neither will this:
        console.log( stdout );
        console.log( stderr );
    });

    console.log(
      chalk.cyan.bold(
        figlet.textSync(folderName, { 
            horizontalLayout: 'full'
        })
      )
    );
    console.log(chalk.gray.bgCyan(" INFO  "), "Starting page server...")
    childProcess.stdout.on
    (
        'data',
        ( data ) =>
        {
            console.log( chalk.cyan.bold(data) );
        }
    );
  }
  catch (err) {
    console.log('chdir: ' + err);
  }
}

async function getNewGithubToken( options ){
  try{
    
    // No token found, use credentials to access GitHub account
    await github.setGithubCredentials({
        username: options.username,
        password: options.password
    });

    // register new token
    let token = await github.registerNewToken( options );
    
    return token;
  }catch(err){
    if (err) {
      switch (err.code) {
        case 422:
          console.log(
            chalk.red(`
            [ERROR]: We could not create a new github token. 
            [FIX]: Delete the generated token associated with personnal page on github
            `)
          );
          break;
        default:
          console.log(err);
      }
    }
  }
}


export async function runBuild() {
  const status = new Spinner('Compiling local repository..');
  status.start();
  try{
    await execPromise('npm run build');
  }catch(err){
    throw(err)
  } finally {
    status.stop();
  }
} 

export async function runResetConf() {
  conf.delete('github.username');
  conf.delete('github.token');
  console.log(chalk.green.bold( `All Done!!`));
} 

export async function runDeploy( options ) {
 
  try{
      let token = options.token; 
    
      if(!token){
        token = await getNewGithubToken( options )
      }
      
      github.githubAuth(token);
      
      repo.createRemoteRepo().then( async ({ url, name})=>{
        const setup = await repo.setupRepo(url);

        if(setup){
          console.log(
            '🎉   Successfully created %s', 
            chalk.yellow.bold( url )
          );
          console.log(
            '🎉   Your personal page is now live at %s', 
            chalk.yellow.bold( `https://${name}`)
          );
        }
      }).catch( async err=>{
       
        switch (err.code) {
         
          case 422:
             
              const updated = await repo.updateRepo();
              if(updated){
                console.log(
              '🎉   Your personal page has been updated successfully');
              }
            break;
          default:
            throw(err)
        }
      });
  }catch(err){
      
      if (err) {
        switch (err.code) {
          case 401:
            console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
            break;
          case 422:
            console.log(chalk.red('There already exists a remote repository with the same name'));
            break;
          case 500:
            console.log(chalk.red('Couldn\'t deploy your page'));
            break;
          default:
            console.log(err);
        }
      }
  }
}
