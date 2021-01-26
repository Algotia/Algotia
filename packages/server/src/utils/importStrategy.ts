import ts from "typescript";
import * as babel from "@babel/core";
import pkgDir from "pkg-dir";
import node_path from "path";
import fs from "fs";
import importFresh from "import-fresh";
import { Strategy } from "@algotia/core";
import getStrategyMeta from "./getStrategyMeta";
import { StrategyTemplateOptions } from "@algotia/types";
import handlebars from "handlebars";

const tempDir = node_path.join(pkgDir.sync(), ".internal/strategyDist/");
const tempFile = node_path.join(tempDir, "strategy.js");

const importStrategy = (
    filePath: string,
    templateOptions: StrategyTemplateOptions
): Strategy => {
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    if (!fs.existsSync(filePath)) {
        throw new Error(`Path ${filePath} does not exist.`);
    }

    const meta = getStrategyMeta(filePath);

    try {
        const source = fs.readFileSync(filePath, "utf-8");

        let transpiled: string;

        if (meta.language === "TypeScript") {
            transpiled = ts.transpileModule(source, {
                compilerOptions: {
                    esModuleInterop: true,
                },
            }).outputText;
        }

        if (meta.language === "JavaScript") {
            transpiled = babel.transformSync(source, {
                filename: filePath,
            }).code;
        }

        const template = handlebars.compile(transpiled);

        const output = template(templateOptions);

        fs.writeFileSync(tempFile, output, {
            encoding: "utf-8",
        });

        const strategy: Strategy = importFresh(tempFile);

        return strategy;
    } catch (err) {
        throw new Error(`Error importing strategy - ${err["message"]}`);
    }
};

export default importStrategy;
