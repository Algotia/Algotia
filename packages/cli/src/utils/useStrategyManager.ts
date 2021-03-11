import { StrategyManager } from "@algotia/strategy-manager";
import { config } from "@algotia/utils";

let strategyManager: StrategyManager;

export const useStrategyManager = (): StrategyManager => {
    if (!config.has("appDir")) {
        throw new Error(
            "Must set appDir in config before using strategyManager"
        );
    }

    if (!strategyManager) {
        strategyManager = new StrategyManager(config.get("appDir"));
    }

    return strategyManager;
};
