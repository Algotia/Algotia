const execa = require("execa");
const node_path = require("path");

const runBuild = (path) => {
	path = node_path.resolve(__dirname, "../", path)
    return execa.command(`npm run build --prefix ${path}`, {
        stdout: process.stdout,
    });
};

runBuild("packages/ccxt");
runBuild("packages/types");
runBuild("packages/core");
runBuild("packages/strategy-manager");
runBuild("packages/server");
runBuild("packages/client");

execa.commandSync("lerna bootstrap --force-local");
