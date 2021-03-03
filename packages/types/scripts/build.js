const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const execa = require("execa");

const getPath = (str) => path.resolve(__dirname, str);

execa.commandSync("tsc", {
    cwd: getPath("../"),
});

const distPath = getPath("../dist");
const srcPath = getPath("../src");
const node_modules = getPath("../node_modules");

if (!fs.existsSync(distPath)) fs.mkdirSync(distPath);

const readFile = (path) => fs.readFileSync(path, "utf8");

const srcFile = readFile(path.join(srcPath, "index.ts"));
const ccxtContents = readFile(
    path.join(node_modules, "@algotia/ccxt/node_modules/ccxt/ccxt.d.ts")
);

const srcContentsSplit = srcFile.split("\n");

const reducer = (a, b) => a + b + " \n"

const srcContents = srcContentsSplit.reduce(reducer);

const bundleContents = `
	${ccxtContents}
declare module "@algotia/types" {
	${srcContents}
}
`;

fs.writeFileSync(
    path.resolve(__dirname, "../dist/index.d.ts"),
    prettier.format(bundleContents, { parser: "babel-ts" }),
    {
        encoding: "utf-8",
    }
);
