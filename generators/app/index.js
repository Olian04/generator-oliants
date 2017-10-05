const Generator = require('yeoman-generator');

const node = {
    main: 'dist/index.js',
    test: "mocha --recursive -r ts-node/register test/**/*.ts",
    scripts: {
        start: "ts-node src/index.ts",
        watch: "tsc -w",
        build: "tsc",
        doc: "typedoc --mode file --out docs/ src/index.ts",
        update: "run npm update --save"
    },
    dependencies:  {
        "lodash": "*",
    },
    devDependencies: {
        "@types/chai": "*",
        "@types/es6-promise": "*",
        "@types/lodash": "*",
        "@types/mocha": "*",
        "@types/node": "*",
        "@types/typescript": "*",
        "chai": "*",
        "mocha": "*",
        "ts-node": "*",
        "typedoc": "*",
        "typescript": "*",
    }
};

const web = {
    main: 'dist/index.js',
    test: "mocha --recursive -r ts-node/register test/**/*.ts",
    scripts: {
        start: "ts-node src/index.ts", // Change this to launch a webserver
        watch: "tsc -w", // Change this to use laravel
        build: "tsc", // Change this to use laravel
        update: "run npm update --save"
    },
    dependencies:  { },
    devDependencies: {
        "@types/chai": "*",
        "@types/jquery": "*",
        "@types/jsdom": "*",
        "@types/lodash": "*",
        "@types/mocha": "*",
        "@types/react": "*",
        "@types/react-dom": "*",
        "@types/typescript": "*",
        "@types/firebase": "*",
        "chai": "*",
        "jquery": "*",
        "jsdom": "*",
        "laravel-mix": "*",
        "lodash": "*",
        "mocha": "*",
        "react": "*",
        "react-dom": "*",
        "typescript": "*",
        "firebase": "*",
        "sass": "*"
    }
};

let chosenEnv = {};

module.exports = class extends Generator {
    selectMode() {
        return this.prompt([
            {
                type: 'list',
                name: 'type',
                message : 'project type:',
                choices: [
                    'Node',
                    'Web'
                ],
                default : 'Node',
                store: true
              }
        ]).then(answers => {
            if (answers.type === 'Node') {
                /* Setup Node env
                * - src/index.ts
                * - test/index.ts
                * - tsconfig.json
                * - 
                */
                chosenEnv = node;
            } else {
                /* Setup Web env
                * - src/
                */
                chosenEnv = web;
            }
        });
    }

    npm() {
        this.composeWith(require.resolve('generator-npm-init/app'), {
            ...chosenEnv
        });
    }
};