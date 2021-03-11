const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const execa = require("execa");

execa.commandSync("tsc");

const getPath = (str) => path.resolve(__dirname, str);

const distPath = getPath("../dist");
const srcPath = getPath("../src");

if (!fs.existsSync(distPath)) fs.mkdirSync(distPath);

const readFile = (path) => fs.readFileSync(path, "utf8");

const srcFile = readFile(path.join(srcPath, "index.ts"));

const srcContentsSplit = srcFile.split("\n");

const reducer = (a, b) => a + b + " \n";

const srcContents = srcContentsSplit.reduce(reducer);

const bundleContents = `
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
