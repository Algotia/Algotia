import { getCacheDir, getInternalDir, getStrategyDir } from "./getDirs";
import fs from "fs";
import { strategyManager } from "./strategyManager";

const mkdirIfNotExists = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
};

export const bootstrap = async () => {
    mkdirIfNotExists(getInternalDir());
    mkdirIfNotExists(getStrategyDir());
    mkdirIfNotExists(getCacheDir());
    console.log("Installing strategy dependencies");
    await strategyManager.installDeps();
    console.log("Done installing strategy dependencies");
};
