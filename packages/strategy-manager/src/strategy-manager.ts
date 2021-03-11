import {
    FileStructure,
    StrategyMetaData,
    StrategyFile,
    StrategyLanguages,
} from "@algotia/types";
import { mkDirIfNotExist, parseLanguageFromExt, walkDir } from "./utils";
import { rootPackageJsonTemplate, strategyTemplates } from "./templates";
import execa from "execa";
import node_path from "path";
import fs from "fs";
import { packageJsonTemplate, tsconfigTemplate } from "./templates";
import dashify from "dashify";

export class StrategyManager {
    private rootDir: string;
    private strategyRoot: string;

    constructor(rootDir: string) {
        this.rootDir = rootDir;
        this.strategyRoot = node_path.join(rootDir, "strategies/");
        if (!fs.existsSync(this.strategyRoot)) {
            this.bootstrap();
        }
    }

    bootstrap = async () => {
        mkDirIfNotExist(this.rootDir);
        mkDirIfNotExist(this.strategyRoot);

        const packageJsonPath = node_path.join(this.rootDir, "package.json");

        fs.writeFileSync(packageJsonPath, rootPackageJsonTemplate, {
            encoding: "utf8",
        });

        await this.installDeps();
    };

    createStrategy = async <Lang extends StrategyLanguages>({
        packageName,
        language,
        templateName,
    }: {
        packageName: string;
        language: Lang;
        templateName?: keyof typeof strategyTemplates[Lang];
    }): Promise<string> => {
        if (!templateName) templateName = "default";

        const strategyPath = node_path.join(
            this.strategyRoot,
            dashify(packageName)
        );

        if (fs.existsSync(strategyPath)) {
            throw new Error(`Strategy named ${packageName} already exists`);
        }

        fs.mkdirSync(strategyPath);
        fs.mkdirSync(node_path.join(strategyPath, "src"));

        const pathToPackageJson = node_path.join(strategyPath, "package.json");

        const packageJsonContents = packageJsonTemplate({
            name: packageName,
            language,
        });

        fs.writeFileSync(pathToPackageJson, packageJsonContents);

        const tsconfigPath = node_path.join(strategyPath, "tsconfig.json");

        const tsconfigContents = tsconfigTemplate();

        fs.writeFileSync(tsconfigPath, tsconfigContents, { encoding: "utf8" });

        const extension =
            (language === StrategyLanguages.TypeScript && ".ts") ||
            (language === StrategyLanguages.JavaScript && ".js");

        const indexFilePath = node_path.join(
            strategyPath,
            `src/index${extension}`
        );

        fs.writeFileSync(
            indexFilePath,
            strategyTemplates[language][templateName.toString()]
        );

        await this.installDeps(strategyPath);

        return strategyPath;
    };

    public installDeps = async (packagePath?: string) => {
        await execa.command("npm i", {
            cwd: packagePath ? packagePath : this.rootDir,
        });
    };

    public getAllStrategies = (): StrategyMetaData[] => {
        const allStrategyDirs = fs.readdirSync(this.strategyRoot);

        return allStrategyDirs.map((strategyDir) => {
            const path = node_path.join(this.strategyRoot, strategyDir);
            const pkgJsonPath = node_path.join(path, "package.json");
            const pkgJsonContents = fs.readFileSync(pkgJsonPath, "utf8");
            const pkgJsonParsed = JSON.parse(pkgJsonContents);

            return {
                path,
                name: pkgJsonParsed.algotia.name,
                language: pkgJsonParsed.algotia.language,
                indexFile: node_path.join(path, pkgJsonParsed.algotia.index),
            };
        });
    };

    public readStrategyDir = (path: string): FileStructure => {
        return walkDir(path);
    };

    public readStrategyFile = (path: string): StrategyFile => {
        if (!fs.existsSync(path)) {
            throw new Error(`Path '${path}' does not exist`);
        }

        const stat = fs.statSync(path);

        const extension = node_path.extname(path);

        return {
            path,
            extension,
            contents: fs.readFileSync(path, "utf8"),
            modifiedAt: stat.mtime.getTime(),
            basename: node_path.basename(path),
            language: parseLanguageFromExt(extension),
        };
    };

    public mkStrategyDir = (path: string): void => {
        fs.mkdirSync(path);
    };

    public writeStrategyFile = (path: string, contents?: string): void => {
        console.log(contents);
        fs.writeFileSync(path, contents || "", { encoding: "utf8" });
    };

    public importStrategy = (path: string) => {
        execa.commandSync("npm run build", { cwd: path, preferLocal: true });

        const pathToIndex = node_path.join(path, "dist/index.js");

        delete require.cache[pathToIndex];

        return require(pathToIndex).default;
    };
}
