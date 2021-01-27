import { getCacheDir, getInternalDir } from "./getDirs";
import fs from "fs";

const mkdirIfNotExists = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
};

export const bootstrap = () => {
    mkdirIfNotExists(getInternalDir());
    mkdirIfNotExists(getCacheDir());
};
