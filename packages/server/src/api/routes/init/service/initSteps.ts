import { Configurer } from "../../../../utils";
import node_path from "path";
import fs from "fs";
import execa from "execa";

const getPkgJsonPath = (root: string): string => {
    return node_path.join(root, "package.json");
};

const getGitDirPath = (root: string): string => {
    return node_path.join(root, ".git/");
};

const getRootDir = (configurer: Configurer) => configurer.get("strategyDir");

type InitStep = (configurer: Configurer) => void | Promise<void>;

const mkStrategyDir: InitStep = (configurer) => {
    const rootDir = getRootDir(configurer);
    const strategyDir = node_path.join(rootDir, "strategies/");
    if (!fs.existsSync(rootDir)) {
        fs.mkdirSync(rootDir, { recursive: true });
        fs.mkdirSync(strategyDir);
    }
};

const npmInit: InitStep = async (configurer) => {
    const rootDir = getRootDir(configurer);
    const pathToPkgJson = getPkgJsonPath(rootDir);
    if (!fs.existsSync(pathToPkgJson)) {
        const initialPkgJson = JSON.stringify({ name: "algotia-strategies" });
        fs.writeFileSync(pathToPkgJson, initialPkgJson, { encoding: "utf8" });
        await execa("npm", ["init", "-y"], { cwd: rootDir });
    }
};

const gitInit: InitStep = async (configurer) => {
    const rootDir = getRootDir(configurer);
    const pathToGitDir = getGitDirPath(rootDir);
    if (!fs.existsSync(pathToGitDir)) {
        await execa("git", ["init"], {
            cwd: rootDir,
        });
    }
};

const verify = (configurer: Configurer): boolean => {
    const rootDir = getRootDir(configurer);
    const pkgJson = getPkgJsonPath(rootDir);
    const gitDir = getGitDirPath(rootDir);
    let bool: boolean;

    bool = fs.existsSync(rootDir);
    bool = fs.existsSync(pkgJson);
    bool = fs.existsSync(gitDir);

    return bool;
};

const initSteps = [mkStrategyDir, npmInit, gitInit];

export { initSteps, verify };
