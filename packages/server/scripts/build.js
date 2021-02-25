const execa = require("execa");
const chalk = require("chalk");

// "build": "tsoa spec-and-routes && tsc && npm run generate-client",

(async () => {
    try {
        await execa.command("tsoa spec-and-routes");
        await execa.command("tsc");
        await execa.command("npm run generate-client");
    } catch (err) {
        console.log(chalk.red("Error during build script"));
        console.log(err);
    }
})();
