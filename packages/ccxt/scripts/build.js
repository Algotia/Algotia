const prettier = require("prettier")
const execa = require("execa");
const path = require("path");
const fs = require("fs");

execa.commandSync("npm run patch", { stdout: process.stdout });
execa.commandSync("tsc");

const source = path.resolve(__dirname, "../node_modules/ccxt/ccxt.d.ts");
const target = path.resolve(__dirname, "../dist/ccxt.d.ts");

let sourceContents = fs.readFileSync(source, "utf8");
let sourceContentsSplit = sourceContents.split("\n");

sourceContentsSplit.shift();
sourceContentsSplit.unshift(`declare module "@algotia/ccxt" {`);

sourceContents = sourceContentsSplit.reduce((a, b) => a + b + "\n", "");
sourceContents = prettier.format(sourceContents, { parser: "babel-ts" })

fs.writeFileSync(target, sourceContents, { encoding: "utf8" });
