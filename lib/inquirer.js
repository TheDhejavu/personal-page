const inquirer   = require('inquirer');
const chalk = require('chalk');
const validUrl = require('valid-url');
const { validateEmail } = require("./util");
const _ = require("lodash");
const isValidPath = require('is-valid-path');
 
module.exports = {
  askOk: ()=>{
    return inquirer.prompt([
      {
        name: 'valid',
        type: 'input',
        message: 'Is this OK? (YES/NO):',
        validate: function( value ) {
          const values = ["yes","y","no","n"];
          if (!value.length || !values.includes(value)) {
            return 'Please enter YES/NO';
          } else {
            return true;
          }
        }
      },
    ]);
  },
  askGithubCredentials: () => {
    const questions = [
      {
        name: 'username',
        type: 'input',
        message: 'Enter your GitHub username:',
        validate: function( value ) {
          if (value.length) {
            if(validateEmail(value))
            return 'Please enter your username or e-mail address.';
            
            return true;
          } else {
            return 'Please enter your username or e-mail address.';
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askHomeQuestions: async ()=>{
    console.log(chalk.green.bold("~~ INTRO"))
    const questions = [
      {
        name: 'fullname',
        type: 'input',
        message: 'Enter your fullname:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your fullname';
          }
        }
      },
      {
        name: 'avatar',
        type: 'input',
        message: 'Enter your avatar image path:',
        validate: function( value ) {
          console.log(isValidPath( value ))
          if (value.length) {
            if(isValidPath( value )){
              return true
            }else{
              return 'Please enter a valid image path';
            }
          } else {
            return true
          }
        }
      },
      {
        name: 'continent',
        type: 'input',
        message: 'Enter your continent:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your continent.';
          }
        }
      },
      {
        name: 'country',
        type: 'input',
        message: 'Enter your country:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your country.';
          }
        }
      },
      {
        name: 'summary',
        type: 'input',
        message: 'Introduce yourself ( < 256 characters):',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please introduce yourself';
          }
        }
      }
    ];
    
    return {home : await inquirer.prompt(questions)};
  },
  askSkillQuestions: async ()=>{
    console.log(chalk.green.bold("~~ SKILLS"))
    const questions = [
      {
        name: 'text',
        type: 'input',
        message: 'Catchy text ( < 100 characters):',
        validate: function( value ) {
          if (value.length < 100) {
            return true;
          } else {
            return 'Text is too long';
          }
        }
      },
      {
        name: 'skills',
        type: 'input',
        message: 'Enter your skills (Separated with comma (,)):',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your skills';
          }
        }
      }
    ];
    answer = await inquirer.prompt(questions);
    skills = answer.skills.split(",");
    return { skill :{
      text: answer.text,
      lists: skills
    }}
  },
  askAboutQuestions: async ()=>{
    console.log(chalk.green.bold("~~ ABOUT"))
    const questions = [
      {
        name: 'text',
        type: 'input',
        message: 'Short Catchy text ( < 150 characters):',
        validate: function( value ) {
          if (value.length < 100) {
            return true;
          } else {
            return 'Text is too long';
          }
        }
      },
      {
        name: 'about',
        type: 'input',
        message: 'About me:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please tell us more about yourself';
          }
        }
      }
    ];
    const answer = await inquirer.prompt(questions);
    return { about : {
      text: answer.text,
      about: answer.about
    }}
  },
  askWorkQuestions: async ()=>{
    console.log(chalk.green.bold("~~ Work"))
    let answers = [];
    let count = 1;
    const value = await inquirer.prompt([
      {
        name: 'text',
        type: 'input',
        message: 'Catchy text ( < 100 characters):',
        validate: function( value ) {
          if (value.length < 100) {
            return true;
          } else {
            return 'Text is too long';
          }
        }
      },
      {
        name: 'total',
        type: 'input',
        message: 'Total Number of work done:',
        validate: function( value ) {
          if (value.length) {
            if(_.isNumber(value))
            return 'Please enter a valid number';

            return true;
          } else {
            return 'Please enter the number of work you have done';
          }
        }
      }
    ]);

    const questions = [
      {
        name: 'title',
        type: 'input',
        message: 'Title:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter work title';
          }
        }
      },
      {
        name: 'description',
        type: 'input',
        message: 'Description:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter work description';
          }
        }
      }
    ];

    for(var i=0;i<value.total;i++){
      console.log(chalk.green.bold(`Work (${count})`))
      let answer = await inquirer.prompt(questions);
      answers.push( answer);
      count++;
    }

    return { work: {
        text:"",
        lists: answers
      }
    };
  },
  askContactQuestions:async ()=>{
    console.log(chalk.green.bold("~~ CONTACT"))
    const questions = [
      {
        name: 'email',
        type: 'input',
        message: 'Enter your email:',
        validate: function(value) {
          if (value.length) {
            if(!validateEmail(value)){
              return 'Please enter a valid email.';
            }else{
              return true
            }
          } else {
            return 'Please enter your email.';
          }
        },
      },
      {
        name: 'twitter_username',
        type: 'input',
        message: 'Twitter Username:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your twitter username';
          }
        }
      },
      {
        name: 'github_username',
        type: 'input',
        message: 'Github Username:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your github username';
          }
        }
      },
      
      {
        name: 'linkedin_name',
        type: 'input',
        message: 'LinkedIn Name:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your linkedin name';
          }
        }
      },
      {
        name: 'linkedin_url',
        type: 'input',
        message: 'LinkedIn Profile Link:',
        validate: function( value ) {
          if (value.length) {
            if (validUrl.isUri(value)){
              return true
            } else {
              return 'Please enter a valid link';
            }
          } else {
            return 'Please enter your linkedin profile link';
          }
        }
      }
    ];
    const answer = await inquirer.prompt(questions);
    let contact = {
      email: answer.email,
      github:{
        "username": answer.github_username,
        "url": `https://github.com/${answer.github_username}`
      },
      twitter:{
        "username": answer.twitter_username,
        "url": `https://twitter.com/${answer.twitter_username}`
      },
      linkedin:{
        "name": answer.linkedin_name,
        "url": answer.linkedin_url
      }
    }
    return { contact };
  },
  askFirstQuestions: (options ) => {
    console.log(chalk.green.bold("~~ GET STARTED "))
    const questions = [
      {
        name: 'theme',
        type: 'list',
        message: 'Choose Theme',
        choices:["White Mode", "Dark Mode"],
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please select a theme';
          }
        }
      },
      {
        name: 'color',
        type: 'list',
        message: 'Favourite color',
        choices:["Red", "Green","Blue","Pink","Purple"],
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please select your favourite color';
          }
        }
      }
    ];
    if(options && options.ignoreTheme)
    questions.splice(0, 1);

    if(options && options.ignoreColor)
    questions.splice(1, 1);
    
    return inquirer.prompt(questions);
  },
  askEditQuestions: async () => {
    console.log(chalk.green.bold("~~ EDIT PAGE "))
    const questions = [
      {
        name: 'changes',
        type: 'checkbox',
        message: 'Tick all the changes you want to make',
        choices:[
          "I want to change Theme", 
          "I want to change Color",
          "I want to change home information",
          "I want to change skills information",
          "I want to change work information",
          "I want to change contact information"
        ],
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please tick changes';
          }
        }
      },
    ];
    const queue = {
        theme:"I want to change Theme", 
        color:"I want to change Color",
        home:"I want to change home information",
        about:"I want to change about information",
        skills:"I want to change skills information",
        work:"I want to change work information",
        contact:"I want to change contact information"
    };

    let answer =  await inquirer.prompt(questions);
    _.forEach(queue, function(value, key) {
      if(_.includes(answer.changes, value)){
        queue[key] = true;
      }else{
        queue[key] = false
      }
    });

    return queue;
  },
}

