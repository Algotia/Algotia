import dashify from "dashify";
import node_path from "path";
import { StrategyLanguages } from "@algotia/types";
import { getLocalDependencyPath } from "./utils";

interface PackageJsonTemplateArgs {
    name: string;
    language: StrategyLanguages;
}

const dependencies = {
    typescript: `"typescript": "file:${getLocalDependencyPath("typescript")}"`,
    algotia_types: `"@algotia/types": "file:${getLocalDependencyPath(
        "@algotia/types"
    )}"`,
} as const;

const rootPackageJsonTemplate = () => {
    return `{
		"name": "algotia-strategies",
		"private": true,
		"workspaces": ["strategies/*"],
		"devDependencies": {
			${dependencies.algotia_types},
			${dependencies.typescript}
		}
	}`;
};

const packageJsonTemplate = async ({
    name,
    language,
}: PackageJsonTemplateArgs): Promise<string> => {
    return `{
		"name": "${dashify(name)}",
		"main": "src/index.${
            language === StrategyLanguages.JavaScript
                ? "js"
                : language === StrategyLanguages.TypeScript
                ? "ts"
                : ""
        }",
		"algotia": {
			"language": "${language}",
			"name": "${name}"
		},
		"scripts": {
			"build": "tsc"
		},
		"devDependencies": {
			${dependencies.typescript}
		}
	}`;
};

const tsconfigTemplate = (): string => {
    return `{
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
	}`;
};

interface LanguageTemplate {
    default: string;
    [key: string]: string;
}

const JavaScriptTemplates: LanguageTemplate = {
    default: `const strategy = async ({ exchange, constants }) => {
		
	};

	export default strategy;
	`,
};

const TypeScriptTemplates: LanguageTemplate = {
    default: `import { Strategy } from "@algotia/types";
const strategy: Strategy = ({ exchange, constants }) => {

};

export default strategy;`,
};

const js = StrategyLanguages.JavaScript;
const ts = StrategyLanguages.TypeScript;

const strategyTemplates: Record<StrategyLanguages, LanguageTemplate> = {
    [ts]: TypeScriptTemplates,
    [js]: JavaScriptTemplates,
};

export {
    packageJsonTemplate,
    rootPackageJsonTemplate,
    tsconfigTemplate,
    strategyTemplates,
};
