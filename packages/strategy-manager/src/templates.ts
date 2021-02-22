import dashify from "dashify";
import { SupportedStrategyLanguages } from "@algotia/types";

interface PackageJsonTemplateArgs {
    name: string;
    language: SupportedStrategyLanguages;
}

const dependencies = {
    typescript: `"typescript": "4.1.5"`,
} as const;

const rootPackageJsonTemplate = () => {
    return `{
		"name": "algotia-strategies",
		"private": true,
		"workspaces": ["strategies/*"],
		"devDependencies": {
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
            language === "JavaScript"
                ? "js"
                : language === "TypeScript"
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

export { packageJsonTemplate, rootPackageJsonTemplate, tsconfigTemplate };
