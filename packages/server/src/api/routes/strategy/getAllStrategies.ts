import { StrategyMetaData } from "../../../types";
import node_path from "path";
import fs from "fs";
import getStrategyMeta from "../../../utils/getStrategyMeta";

export interface GetAllStrategiesResponseBody {
    strategies: StrategyMetaData[];
}

const getAllStrategies = (
    strategyDir: string
): GetAllStrategiesResponseBody => {
    const strategyDirContents = fs.readdirSync(strategyDir);

    const strategies = strategyDirContents.reduce<StrategyMetaData[]>(
        (acc, cur) => {
            const filePath = node_path.join(strategyDir, cur);

            try {
                const meta = getStrategyMeta(filePath);
                acc.push(meta);
            } catch (err) {}
            return acc;
        },
        []
    );
    return { strategies };
};

export default getAllStrategies;
