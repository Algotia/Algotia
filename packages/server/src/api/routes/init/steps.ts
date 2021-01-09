import node_path from "path";
import fs from "fs";
import { Configurer } from "../../../utils";
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
    const dir = getRootDir(configurer);
    const pathToPkgJson = getPkgJsonPath(dir);
    if (!fs.existsSync(pathToPkgJson)) {
        const initialPkgJson = JSON.stringify({ name: "algotia-strategies" });
        fs.writeFileSync(pathToPkgJson, initialPkgJson, { encoding: "utf8" });
        await execa("npm", ["init", "-y"]);
    }
};

const gitInit: InitStep = async (configurer) => {
    const dir = getootDir(configurer);
    const pathToGitDir = getGitDirPath(dir);
    if (!fs.existsSync(pathToGitDir)) {
        await execa("git", ["init"], {
            cwd: dir,
        });
    }
};

const verify = (configurer: Configurer): boolean => {
    const dir = getRootDir(configurer);
    const pkgJson = getPkgJsonPath(dir);
    const gitDir = getGitDirPath(dir);
    let bool: boolean;

    bool = fs.existsSync(dir);
    bool = fs.existsSync(pkgJson);
    bool = fs.existsSync(gitDir);

    return bool;
};

const initSteps = [mkStrategyDir, npmInit, gitInit];

export { initSteps, verify };
