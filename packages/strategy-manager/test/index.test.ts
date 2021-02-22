import { StrategyManager } from "../src/strategy-manager";
import node_path from "path";
import os from "os";
import { walkDir } from "../src/utils";
import { inspect } from "util";

let strategyManager: StrategyManager;

beforeAll(() => {
    const strategyDir = node_path.join(os.homedir(), "algotia/");

    strategyManager = new StrategyManager(strategyDir);
});

it("Should create strategy directory and files", async () => {
    await strategyManager.createStrategy("foo", "TypeScript");
    await strategyManager.createStrategy("bar", "JavaScript");
    // const foo = strategyManager.getAllStrategies()[0];
    // strategyManager.writeStrategyFile(
    //     node_path.join(foo.path, "src/index.js"),
    //     "export default async () => {}"
    // );
    // const strat = strategyManager.importStrategy(foo.path);
    //
    // console.log(strat.toString());
});
