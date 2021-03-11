const execa = require("execa");
const node_path = require("path");
const ora = require("ora");

const packages = [
    "ccxt",
    "types",
    "core",
    "utils",
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
        const childProcess = await execa.command(
            `npm run build --prefix ${packageName}`
        );

        if (childProcess.failed) {
            throw new Error(childProcess.stderr);
        }
    } catch (err) {
        console.log(`Error building ${packageName}`);
        console.error(err);
        process.exit(0);
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
