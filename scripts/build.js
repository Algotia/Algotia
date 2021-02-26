const execa = require("execa");
const node_path = require("path");
const ora = require("ora");

const packages = [
    "ccxt",
    "types",
    "core",
    "strategy-manager",
    "server",
    "client",
];

const spinner = ora("Starting build").start();

const runBuild = async (packageName) => {
    const pkgIndex = packages.indexOf(packageName);
    spinner.text = `Building ${packageName} [${pkgIndex + 1}/${
        packages.length
    }]`;
    packageName = node_path.resolve(__dirname, "../packages", packageName);
    try {
        await execa.command(`npm run build --prefix ${packageName}`, {
            stdout: "ignore",
        });
    } catch (err) {
        console.log(`Error building ${packageName}`);
        console.error(err);
    }
};

(async () => {
    let didError = false;
    const hrStart = process.hrtime();
    try {
        for (const pkg of packages) {
            await runBuild(pkg);
        }
    } catch (err) {
        didError = true;
    } finally {
        spinner.stop();
        if (!didError) {
            const hrEnd = process.hrtime(hrStart);
            console.info(`Built ${packages.length} packages in %ds`, hrEnd[0]);
        }
    }
})();
