import { StrategyMetaData } from "../types";
import node_path from "path";
import fs from "fs";

const getStrategyMeta = (path: string): StrategyMetaData => {
    if (!fs.existsSync(path)) {
        throw new Error(`Path ${path} does not exist`);
    }

    try {
        const stat = fs.statSync(path);
        if (!stat.isFile()) {
            throw new Error(`Path ${path} is not a file`);
        }
    } catch (err) {
        throw err;
    }

    const basename = node_path.basename(path);

    const ext = node_path.extname(path).replace(".", "");

    let language: "javascript" | "typescript";

    switch (ext) {
        case "js":
        case "cjs":
        case "mjs":
            language = "javascript";
            break;
        case "ts":
            language = "typescript";
    }
    return {
        basename,
        language,
        path,
    };
};

export default getStrategyMeta;
