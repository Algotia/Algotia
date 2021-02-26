const rimraf = require("rimraf");
const path = require("path");
const execa = require("execa");

const cleanDist = (packageName) => {
    const distPath = path.join(packageName, "dist/");
    rimraf.sync(distPath);
    const pl = path.join(packageName, "yarn.lock");
    rimraf.sync(pl);
};

execa.commandSync("lerna clean --yes"); // Cleans node_modules
cleanDist("packages/ccxt");
cleanDist("packages/types");
cleanDist("packages/core");
cleanDist("packages/strategy-manager");
cleanDist("packages/client");
cleanDist("packages/server");
cleanDist("packages/web-ui");
