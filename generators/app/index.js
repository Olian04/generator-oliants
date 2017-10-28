const Generator = require('yeoman-generator');
const fs = require('fs');

function mkdir(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

let chosenEnv = {};

module.exports = class extends Generator {
    selectMode() {
        return this.prompt([
            {
                type: 'list',
                name: 'type',
                message : 'project type:',
                choices: [
                    'node_package',
                    'web_spa'
                ],
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
        this.composeWith(require.resolve('generator-npm-init/app'));
    }
};