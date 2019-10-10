const chalk = require('chalk');
const pkg    = require('../package.json');
const path =require('path');
const execa = require('execa');
const figlet = require("figlet");
const clear = require("clear");
const fs = require('fs-extra')
const Listr = require('listr');
const { projectInstall }  = require( 'pkg-install');
const files = require("./files");
const github = require("./github");
const exec = require('child_process').exec;
const repo = require("./repo");

export function runHelp(){
    const help = `
    These are common Page commands used in various situations:

    -v --version        Check package version
    -h --help           Check for command help
    create              Create a new personal page
    edit                Edit an existing personal page
    remove              Remove an existing personal page
    deploy              Deploy a new personal page to github pages
    serve               Serve your new personal page locally via 127.0.0.1:port`;
    
    console.log( help );
    process.exit();
}

export function runVersion(){
    console.log(chalk.green(`personal-page: ${ pkg.version}` ));
    process.exit();
}



async function initGit(options) {
    const result = await execa('git', ['init'], {
      cwd: options.targetDirectory,
    });
    if (result.failed) {
      return Promise.reject(new Error('Failed to initialize git'));
    }
    return;
}

async function addPageInformation({ answers, targetDirectory }){
  if(answers.home.avatar && files.fileExists(answers.home.avatar)){
    await fs.copySync(answers.home.avatar, targetDirectory+"/public/assets/avatar.png");
  }
  answers.home.avatar = "./assets/avatar.png";
  answers = JSON.stringify(answers);
  return await files.writeToFile(targetDirectory+"/src/data/page.config.json", answers);
};

async function copyTemplateFiles(options) {
 return fs.copySync(options.templateDirectory, options.targetDirectory,{
    filter: path => {
      return !(path.indexOf('node_modules') > -1)
    }
  });
}

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
          '🎉   Successfully created page %s', 
           chalk.yellow.bold( options.folderName)
        );
        await runServe( options );
        return true;
    }catch( error){
        return false;
    }
}

export async function updateProject( options ){
  const tasks = new Listr([
      {
        title: 'Update page...',
        task: () => updateConfigFile(options),
      },
  ]);
  
  try{
      await tasks.run();
      options.folderName = options.folderName || files.getCurrentDirectoryBase()
      console.log(
        '🎉   Successfully updated %s', 
        chalk.yellow.bold( options.folderName)
      );
      return true;
  }catch( error){
      return false;
  }
}

export async function runServe( { folderName }){
  try {
    clear()
    if(folderName){
      process.chdir(folderName);
    }else{
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

export async function getNewGithubToken( options ){
  try{
    // No token found, use credentials to access GitHub account
    await github.setGithubCredentials({
        username: options.username,
        password: options.password
    });

    // // register new token
    let token = await github.registerNewToken( options );
    return token;
  }catch(err){
    console.log( err)
  }
}


export async function runDeploy( options ) {
  const tasks_1 = new Listr([
      {
        title: 'Run Build',
        task: () => execa('npm', ['build'])
      },
      {
        title: 'Create repository',
        task: () => repo.createRemoteRepo().then( async result=>{
          console.log( result)
          await task( result ).run()
        })
      }
  ]);

  const task = ( url )=>{
    
    const tasks_2 = new Listr([
      {
        title: 'Initialize local repository and push to remote...',
        task: async () =>  await repo.setupRepo(url)
      }
    ]);
  
    return tasks_2
  }

  try{
    
      let token = options.token; 
      if(!token){
        token = await getNewGithubToken( options )
      }
      
      github.githubAuth(token);
      
      const tasks = await tasks_1.run();
      console.log(
        '🎉   Successfully created %s', 
        chalk.yellow.bold( "https://github.com/TheDhejavu/thedhejavu.github.io")
      );
      console.log(
        '🎉   Your personal page is now live at %s', 
        chalk.yellow.bold( "https://thedhejavu.github.io")
      );
  }catch(err){
      console.log( err)
      if (err) {
        switch (err.code) {
          case 401:
            console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
            break;
          case 422:
            console.log(chalk.red('There already exists a remote repository with the same name'));
            break;
          default:
            console.log(err);
        }
      }
  }
}
