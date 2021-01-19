import { StrategyData } from "../../../types";
import getStrategyMeta from "../../../utils/getStrategyMeta";
import node_path from "path";
import fs from "fs";

export interface GetSingleStrategyResponseBody extends StrategyData {}

const getSingleStrategy = (
    fileName: string,
    strategyDir: string
): GetSingleStrategyResponseBody => {
    const strategyDirContents = fs.readdirSync(strategyDir);

    fileName = strategyDirContents.find((path) => {
        return path === fileName;
    });

    if (!fileName) {
        throw new Error(`No strategy with file name ${fileName}`);
    }

    const strategyPath = node_path.join(strategyDir, fileName);

    const meta = getStrategyMeta(strategyPath);
    const value = fs.readFileSync(strategyPath, { encoding: "utf8" });

    return {
        ...meta,
        value,
    };
};

export default getSingleStrategy;
