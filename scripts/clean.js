const execa = require("execa");

execa.commandSync("lerna exec -- rm package-lock.json", {
    stdout: process.stdout,
});

execa.commandSync("lerna exec -- rm -rf dist/", {
    stdout: process.stdout,
});

execa.commandSync("lerna clean --yes", {
    stdout: process.stdout,
});
