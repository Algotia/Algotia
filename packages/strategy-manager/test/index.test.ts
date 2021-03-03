import node_path from "path";
import fs from "fs";
import os from "os";
import { StrategyManager } from "../src/strategy-manager";
import { StrategyLanguages } from "@algotia/types";
import dashify from "dashify";
import { strategyTemplates } from "../src/templates";

const algotiaRoot = node_path.join(os.tmpdir(), "algotia-test");
const strategyRoot = node_path.join(algotiaRoot, "strategies");

let strategyManager: StrategyManager;

const clean = () => {
    if (fs.existsSync(algotiaRoot)) {
        fs.rmdirSync(algotiaRoot, { recursive: true });
    }
};

beforeEach(() => {
    clean();
    strategyManager = new StrategyManager(algotiaRoot);
});

afterAll(() => {
    clean();
});

it("should bootstrap algotia dir", () => {
    expect(fs.existsSync(algotiaRoot)).toStrictEqual(true);
    expect(fs.existsSync(strategyRoot)).toStrictEqual(true);
    expect(
        fs.existsSync(node_path.join(algotiaRoot, "package.json"))
    ).toStrictEqual(true);
    expect(
        !fs.existsSync(node_path.join(algotiaRoot, "node_modules/"))
    ).toStrictEqual(true);
});

it("should create a typescript strategy", async () => {
    const packageName = "TS Strategy";

    const strategyPath = await strategyManager.createStrategy({
        packageName,
        language: StrategyLanguages.TypeScript,
    });

    expect(fs.existsSync(strategyPath)).toStrictEqual(true);
    expect(fs.statSync(strategyPath).isDirectory()).toStrictEqual(true);

    const indexFilePath = node_path.join(strategyPath, "src/index.ts");

    expect(fs.existsSync(indexFilePath)).toStrictEqual(true);

    expect(fs.readFileSync(indexFilePath, "utf8")).toStrictEqual(
        strategyTemplates.TypeScript.default
    );
});

it("should create a javascript strategy", async () => {
    const packageName = "JS Strategy";

    const strategyPath = await strategyManager.createStrategy({
        packageName,
        language: StrategyLanguages.JavaScript,
    });

    expect(fs.existsSync(strategyPath)).toStrictEqual(true);
    expect(fs.statSync(strategyPath).isDirectory()).toStrictEqual(true);

    const indexFilePath = node_path.join(strategyPath, "src/index.js");

    expect(fs.existsSync(indexFilePath)).toStrictEqual(true);

    expect(fs.readFileSync(indexFilePath, "utf8")).toStrictEqual(
        strategyTemplates.JavaScript.default
    );
});

it("should return all strategies", async () => {
    const strategyPath1 = await strategyManager.createStrategy({
        packageName: "Strat 1",
        language: StrategyLanguages.TypeScript,
    });

    const strategyPath2 = await strategyManager.createStrategy({
        packageName: "Strat 2",
        language: StrategyLanguages.TypeScript,
    });


	const allStrats = strategyManager.getAllStrategies()
	console.log(allStrats)

});
