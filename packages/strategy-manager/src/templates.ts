import dashify from "dashify";
import { StrategyLanguages } from "@algotia/types";
import { getLocalDependencyPath } from "./utils";
import prettier from "prettier";

const dependencies = {
    typescript: `"typescript": "^4.0.0"`,
    algotia_types: `"@algotia/types": "file:${getLocalDependencyPath(
        "@algotia/types"
    )}"`,
} as const;

const format = {
    json: (str: string) => prettier.format(str, { parser: "json" }),
    typescript: (str: string) => prettier.format(str, { parser: "babel-ts" }),
    javascript: (str: string) => prettier.format(str, { parser: "babel" }),
};

export const rootPackageJsonTemplate = format.json(
    `{
			"name": "algotia-strategies",
			"workspaces": ["strategies/*"],
			"private": true
	}`
);

export const packageJsonTemplate = ({
    name,
    language,
}: {
    name: string;
    language: StrategyLanguages;
}): string => {
    const extension =
        (language === StrategyLanguages.TypeScript && "ts") ||
        (language === StrategyLanguages.JavaScript && "js");
    return format.json(
        `{
				"name": "${dashify(name)}",
				"main": "dist/index.js",
				"version": "1.0.0",
				"algotia": {
					"language": "${language}",
					"index": "src/index.${extension}",
					"name": "${name}"
				},
				"scripts": {
					"build": "tsc"
				},
				"dependencies": {
					${dependencies.algotia_types}
				},
				"devDependencies": {
					${dependencies.typescript}
				}
			}`
    );
};

export const tsconfigTemplate = (): string => {
    return format.json(
        `{
				"compilerOptions": {
					"target": "ES6",
					"lib": ["ES2019"],
					"module": "CommonJS",
					"allowJs": true,
					"outDir": "./dist",
					"declaration": true,
					"rootDir": "./src",
					"sourceMap": true,
					"esModuleInterop": true,
					"skipLibCheck": true,
					"experimentalDecorators": true,
					"emitDecoratorMetadata": true
				},
				"include": ["src"],
				"exclude": ["node_modules"]
			}`
    );
};

const JavaScriptTemplates = {
    default: format.javascript(
        `
			/**
				* @type {import("@algotia/types").Strategy}
			*/
			const strategy = async ({ exchange, constants }) => {

			};

			export default strategy;
			`
    ),
} as const;

const TypeScriptTemplates = {
    default: format.typescript(
        `import { Strategy } from "@algotia/types";
			const strategy: Strategy = ({ exchange, constants }) => {

			};

			export default strategy;`
    ),
} as const;

export const strategyTemplates = {
    [StrategyLanguages.TypeScript]: TypeScriptTemplates,
    [StrategyLanguages.JavaScript]: JavaScriptTemplates,
};
