import { StrategyManager } from "@algotia/strategy-manager";
import node_path from "path";
import os from "os";

export const strategyManager = new StrategyManager(
    node_path.join(os.homedir(), "algotia/")
);
