const execa = require("execa");

const runBuild = (path) => {
    return execa("npm", ["run", "build", "--prefix", path], {
        stdout: process.stdout,
    });
};

(async () => {
    await runBuild("packages/ccxt");
    await runBuild("packages/types");
    await runBuild("packages/core");
    await runBuild("packages/server");
    await runBuild("packages/client");
})();
