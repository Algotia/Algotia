import { StrategyMetaData } from "@algotia/types";
import node_path from "path";
import fs from "fs";

const getStrategyMeta = (path: string): StrategyMetaData => {
    if (!fs.existsSync(path)) {
        throw new Error(`Path ${path} does not exist`);
    }

    const stat = fs.statSync(path);
    if (!stat.isFile()) {
        throw new Error(`Path ${path} is not a file`);
    }
    const modifiedAt = stat.mtime.getTime();

    const basename = node_path.basename(path);

    const ext = node_path.extname(path).replace(".", "");

    let language: StrategyMetaData["language"];

    switch (ext) {
        case "js":
        case "cjs":
        case "mjs":
            language = "JavaScript";
            break;
        case "ts":
            language = "TypeScript";
    }
    return {
        modifiedAt,
        basename,
        language,
        path,
    };
};

export default getStrategyMeta;
