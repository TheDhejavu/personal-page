const inquirer = require("./inquirer");
const chalk = require('chalk');
const files = require("./files");
const CLI   = require('clui');
const prettyjson = require('prettyjson');
const Spinner = CLI.Spinner;
const _ = require("lodash");
const github = require("./github");

import { 
    runVersion, 
    runHelp, 
    createProject, 
    updateProject, 
    runServe, 
    runDeploy,
    runResetConf
} from "./misc";

export async function promptQuestions(options) {
   
    let answers = {},
        response, 
        firstAnswers,
        homeAnswers,
        aboutAnswers,
        skillsAnswers,
        workAnswers ,
        contactAnswers;
        
    if(options.create && options.folderName){
        if(files.directoryExists( options.folderName)){
            console.log(chalk.gray("[ERROR]:") +` Folder name already exist in directory` );
            process.exit()
        }
        firstAnswers  = await inquirer.askFirstQuestions();
        homeAnswers = await inquirer.askHomeQuestions();
        aboutAnswers = await inquirer.askAboutQuestions();
        skillsAnswers = await inquirer.askSkillQuestions();
        workAnswers = await inquirer.askWorkQuestions();
        contactAnswers = await inquirer.askContactQuestions();

        answers = { 
            ...firstAnswers,
            ...homeAnswers, 
            ...aboutAnswers, 
            ...skillsAnswers, 
            ...workAnswers, 
            ...contactAnswers
        };    
    
        console.log(prettyjson.render(answers, {
            keysColor: 'green',
            stringColor: 'yellow'
        }));
       
        const answer = await inquirer.askOk();
        if(_.toUpper(answer.valid) == "YES" || _.toUpper(answer.valid) == "Y"){
            
            try {
                const project = await createProject({ 
                    answers,
                    ...options
                });
                return project;
            } catch(err) {
                throw err;
            } 
        }else{
            console.log(chalk.white(`Aborted.` ));
            return process.exit();
        }
    }

    if(options.create && !options.folderName){
        console.log(chalk.gray("[ERROR]: ")+` Folder name is not specified ` );
        process.exit()
    }

    if(options.edit){
        if(!files.fileExists(process.cwd()+"/src/data/page.config.json")){
            console.log(chalk.gray("[ERROR]:")+ ` Unable to edit page
    make sure you are in the root folder of your personnal page directory`
            );
            process.exit()
        }
        response = await inquirer.askEditQuestions();
        firstAnswers = (response.theme || response.color)? 
                            await inquirer.askFirstQuestions({ 
                                ignoreTheme: !response.theme,
                                ignoreColor: !response.color
                            }) : {};

        homeAnswers = (response.home)? await inquirer.askHomeQuestions() : {};
        aboutAnswers = (response.about)? await inquirer.askAboutQuestions() : {};
        skillsAnswers = (response.skills)? await inquirer.askSkillQuestions() : {};
        workAnswers = (response.work)? await inquirer.askWorkQuestions() : {};
        contactAnswers = (response.contact)? await inquirer.askContactQuestions() : {};

        answers = {
            ...firstAnswers,
            ...homeAnswers, 
            ...aboutAnswers, 
            ...skillsAnswers, 
            ...workAnswers, 
            ...contactAnswers
        };

        console.log(prettyjson.render(answers, {
            keysColor: 'green',
            stringColor: 'yellow'
        }));

        const answer = await inquirer.askOk();
        if(_.toUpper(answer.valid) == "YES" || _.toUpper(answer.valid) == "Y"){
            
            try {
                const project = await updateProject({ 
                    answers,
                    ...options
                });
                return project;
            } catch(err) {
                throw err;
            } 
        }else{
            console.log(chalk.white(`Aborted.` ));
            return process.exit();
        }
    }

    if(options.deploy){
        if(!files.fileExists(process.cwd()+"/src/data/page.config.json")){
            console.log(chalk.gray("[ERROR]:")+ `Unable to deploy page
    make sure you are in the root folder of your personnal page directory`
            );
            return process.exit()
        }
        try{
            const token = github.getStoredGithubToken();
            console.log(chalk.green.bold("~~ DEPLOY"));
            
            if(!token){
                response = await inquirer.askGithubCredentials();
            }else{
                response = {}
            }
            return await runDeploy({
                token,
                ...response,
                ...options
            });
        }catch(error){
            console.log( error)
            return error;
        }

    }

    if(options.serve){
        return await runServe( options )
    }

    if(options.reset){
        if(options._[1] !== "conf")
        return console.log(chalk.gray(`[ERROR]:` ),`Missing argument. See 'page --help'`)

        return await runResetConf( options )
    }

    if(options.version && options._.length === 0){
        return runVersion()
    }
    
    if(options.help && options._.length === 0){
        return runHelp()
    }

    if(options._[0])
        console.log(chalk.gray(`[ERROR]:` ),`${options._[0]} is not a page command. See 'page --help'`)
    else
        console.log(chalk.cyan(`[ERROR]:` ),`Command requires atleast two arguments. See 'page --help`) 
}