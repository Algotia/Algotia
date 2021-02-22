import dashify from "dashify";
import fs from "fs";
import node_path from "path";
import bootstrap from "./bootstrap";
import {
    FileStructure,
    StrategyMetaData,
    StrategyFile,
    SupportedStrategyLanguages,
} from "@algotia/types";
import { mkDirIfNotExist, parseLanguageFromExt, walkDir } from "./utils";
import { rootPackageJsonTemplate } from "./templates";
import execa from "execa";

export class StrategyManager {
    private rootDir: string;
    private strategyRoot: string;

    constructor(rootDir: string) {
        this.rootDir = rootDir;
        this.strategyRoot = node_path.join(rootDir, "strategies/");

        mkDirIfNotExist(this.rootDir);
        mkDirIfNotExist(this.strategyRoot);

        const packageJsonPath = node_path.join(this.rootDir, "package.json");

        fs.writeFileSync(packageJsonPath, rootPackageJsonTemplate(), {
            encoding: "utf8",
        });
    }

    public createStrategy = async (
        name: string,
        language: SupportedStrategyLanguages
    ) => {
        await bootstrap({
            root: this.strategyRoot,
            name: name,
            language,
        });
    };

    public installDeps = async () => {
        await execa("yarn", ["install"], {
            cwd: this.rootDir,
            preferLocal: true,
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
                language: pkgJsonParsed.algotia.parsed,
                indexFile: node_path.join(path, pkgJsonParsed.main),
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
        execa.sync("yarn", ["build"], { cwd: path, preferLocal: true });

        const pathToIndex = node_path.join(path, "dist/index.js");

        delete require.cache[pathToIndex];

        return require(pathToIndex).default;
    };
}
