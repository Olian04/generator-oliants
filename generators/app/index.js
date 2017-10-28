const Generator = require('yeoman-generator');
const fs = require('fs');
const { join } = require('path');

const isDirectory = source => 
    fs.lstatSync(source).isDirectory();
const getDirectories = source => 
    fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory).map(uri => uri.substring(uri.lastIndexOf('/')+1));

    function mkdir(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}
  
module.exports = class extends Generator {
    selectMode() {
        return this.prompt([
            {
                type: 'list',
                name: 'type',
                message : 'project type:',
                choices: getDirectories(this.sourceRoot()),
                default : 'node_package'
              }
        ]).then(answers => {
            mkdir('docs');
            this.fs.copyTpl(
                this.templatePath(answers.type),
                this.destinationPath()
            );
        });
    }

    npm() {
        // This needs to be the last method since it uses the current package.json as its start point
        this.composeWith(require.resolve('generator-npm-init/app'));
    }
};