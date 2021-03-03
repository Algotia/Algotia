import { StrategyManager } from "@algotia/strategy-manager";
import os from "os";
import path from "path";

export const strategyManager = new StrategyManager(path.join(os.homedir(), "algotia/"));
