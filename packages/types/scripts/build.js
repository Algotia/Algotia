const fs = require("fs");
const path = require("path");
const execa = require("execa");
const prettier = require("prettier");

const srcContents = fs.readFileSync(
    path.resolve(__dirname, "../src/index.ts"),
    {
        encoding: "utf-8",
    }
);

const targetContents = `
declare module "@algotia/types" {
	${srcContents}
}
`;

fs.writeFileSync(
    path.resolve(__dirname, "../types.d.ts"),
    prettier.format(targetContents, { parser: "babel-ts" }),
    {
        encoding: "utf-8",
    }
);

execa.commandSync("tsc");
