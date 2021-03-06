#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

const node_modules = path.resolve(`${__dirname}/../node_modules`);
const targetBase = path.resolve(`${__dirname}/../src/assets/editor_types/`);

const nodeTypeFiles = fs
    .readdirSync(path.join(node_modules, "@types/node"))
    .filter((file) => file.endsWith(".d.ts"));

const nodeDeps = nodeTypeFiles.map((fileName) => {
    const baseName = fileName.replace(".d.ts", "");
    return {
        name: baseName,
        label: "_" + baseName.replace(".", "_"),
        path: path.join(node_modules, `@types/node/${fileName}`),
    };
});

const deps = [
    {
        name: "@algotia/types",
        label: "algotia_types",
        path: path.join(node_modules, "@algotia/types/dist/index.d.ts"),
    },
	{
		name: "@algotia/ccxt",
		label: "algotia_ccxt",
		path: path.join(node_modules, "@algotia/ccxt/dist/ccxt.d.ts")
	},
    ...nodeDeps,
];

if (!fs.existsSync(targetBase)) {
    fs.mkdirSync(targetBase);
}

for (const dep of deps) {
    const { label, path: depPath } = dep;
    const dtsContents = fs.readFileSync(depPath, { encoding: "utf8" });

    const targetFileContents = `
// This file is automatically generated. Do not edit it.

const ${label} = ${JSON.stringify(dtsContents)}

export default ${label}
`;

    fs.writeFileSync(path.join(targetBase, `${label}.js`), targetFileContents, {
        encoding: "utf8",
    });
}

const indexTemplate = `
${deps.reduce((acc, { label }) => {
    acc += `import ${label} from "./${label}" \n`;
    return acc;
}, "")}

export default {
	${deps.reduce((acc, { name, label }) => {
        acc += `'${name}': ${label},`;
        return acc;
    }, "")}
}
`;

fs.writeFileSync(path.join(targetBase, "index.js"), indexTemplate);
