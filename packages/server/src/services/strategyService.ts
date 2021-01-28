import { Strategy } from "@algotia/core";
import { StrategyTemplateOptions } from "../types";
import * as babel from "@babel/core";
import ts from "typescript";
import importFresh from "import-fresh";
import { StrategyMetaData } from "../types";
import node_path from "path";
import fs from "fs";
import handlebars from "handlebars";
import { getInternalDir, getStrategyDir } from "../utils";

export interface GetStrategyResult {
    value: string;
    meta: StrategyMetaData;
}

export class StrategyService {
    private strategyDir: string;

    constructor() {
        if (!fs.existsSync(this.outDir)) {
            fs.mkdirSync(this.outDir);
        }
        this.strategyDir = getStrategyDir();
    }

    private outDir = node_path.join(getInternalDir(), "strategyDist/");

    private getPath = (fileName: string): string => {
        const path = node_path.join(this.strategyDir, fileName);

        if (!fs.existsSync(path)) {
            throw new Error(`Path ${path} does not exist`);
        }

        return path;
    };

    public getMeta(fileName: string): StrategyMetaData {
        const path = this.getPath(fileName);

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
    }

    public async import(
        fileName: string,
        templateOptions: StrategyTemplateOptions
    ): Promise<Strategy> {
        const path = this.getPath(fileName);

        const meta = this.getMeta(path);

        const source = fs.readFileSync(path, "utf-8");

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
                filename: path,
                presets: ["@babel/preset-env"],
            }).code;
        }

        const template = handlebars.compile(transpiled);

        const output = template(templateOptions);

        const outFile = node_path.join(this.outDir, `${meta.basename}.js`);

        fs.writeFileSync(outFile, output, {
            encoding: "utf-8",
        });

        return importFresh(path);
    }

    public async write(fileName: string, contents: string) {
        const path = this.getPath(fileName);

        fs.writeFileSync(path, contents, {
            encoding: "utf8",
        });
    }

    public getStrategy(fileName: string): GetStrategyResult {
        const path = this.getPath(fileName);
        const value = fs.readFileSync(path, "utf8");
        const meta = this.getMeta(fileName);
        return {
            value,
            meta,
        };
    }
}
