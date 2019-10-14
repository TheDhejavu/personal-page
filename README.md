# Personal-page

[![CircleCI](https://circleci.com/gh/TheDhejavu/personal-page.svg?style=svg)](https://circleci.com/gh/TheDhejavu/personal-page)
[![Github](https://img.shields.io/github/package-json/v/thedhejavu/personal-page)](https://github.com/TheDhejavu/personal-page)
[![npm](https://img.shields.io/npm/v/personal-page/latest)](https://www.npmjs.com/package/personal-page)
![minzip](https://img.shields.io/bundlephobia/minzip/personal-page)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/personal-page)
![licence](https://img.shields.io/github/license/thedhejavu/personal-page)

## About
Personal page is a simple command-line tool for generating static personal page that is ready to be served by GitHub pages or any other server. This CLI generates your page from a series of question asked from you. It's customizable and comes with dark and light mode with any secondary color 

## Demo
(Demo)(https://thedhejavu.github.io)

## How to install
`npm install -g personal-page`

## Commands
These are common Page commands used in various situations:

 `page -v --version`  - Check package version
 
 `page -h --help`     - Check for command help
 
 `page create <folder-name>` - Create a new personal page
 
 `page edit `              - Edit an existing personal page
 
 `page reset conf `        - Reset an existing personal page configuration 
 
 `page deploy  `           -  Deploy a new personal page to github pages
 
 `page serve `             - Serve your new personal page locally;
 
 `page --help -h `             - View the above commands and uses;
 
 ## Getting started
 
 ### Create
 We use the create command to create a new personnal page. You will be prompted for some questions about  yourself via the CLI 
 
  `page create <folder-name>`
  
  The page will be genrated and served immediately for preview before deploying to github pages
  
 ### Edit
 Use the edit command to edit existing page 
 
 `page edit`
 
 you will prompted for a series of question on the changes you would like to make 
 
 **NOTE:** you have to be inside the root folder your page
 
 ### Deploy
 This command deploys your page to github pages by default 
 
  `page deploy`
  
 you will prompted to enter your github username and password and a token would be generated for subsequent uses.
 
 **NOTE** we don't store your credentials 
 
 ### Serve 
 Use this command to serve and preview your page locally 
 
 `page serve`
 
 ### Reset conf
 Use this command to clear the CLI stored configurations. This might be useful when you encouter github signin errors which most times is as a result of deleted token 
 
 `page reset conf`
 
 ## Contribution
 👍 , would be glad to see you make this tiny tool better
 
  
 
    
