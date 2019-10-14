const argv = require('minimist')
const prompt = require("./lib/prompt");

function parseArgumentsIntoOptions(rawArgs) {
  const args = argv(rawArgs.slice(2),{
    boolean:[
      "help",
      "version"
    ],
    alias:{
      h: "help",
      v:"version"
    }
  });
  
  const options = {
    create: (args._[0] == "create")? true : false,
    edit: (args._[0] == "edit")? true : false,
    deploy: (args._[0] == "deploy")? true : false,
    serve: (args._[0] == "serve")? true : false,
    reset: (args._[0] == "reset")? true : false,
    folderName: args._[1] || "",
    ...args
  };
  
  return options;
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  await prompt.promptQuestions( options );
}