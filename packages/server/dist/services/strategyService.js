"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyService = void 0;
const babel = __importStar(require("@babel/core"));
const typescript_1 = __importDefault(require("typescript"));
const import_fresh_1 = __importDefault(require("import-fresh"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const utils_1 = require("../utils");
class StrategyService {
    constructor() {
        this.outDir = path_1.default.join(utils_1.getInternalDir(), "strategyDist/");
        this.getPath = (path) => {
            if (!path.startsWith(this.strategyDir)) {
                path = path_1.default.join(this.strategyDir, path);
            }
            if (!fs_1.default.existsSync(path)) {
                throw new Error(`Path ${path} does not exist`);
            }
            return path;
        };
        if (!fs_1.default.existsSync(this.outDir)) {
            fs_1.default.mkdirSync(this.outDir);
        }
        this.strategyDir = utils_1.getStrategyDir();
    }
    getMeta(fileName) {
        const path = this.getPath(fileName);
        const stat = fs_1.default.statSync(path);
        if (!stat.isFile()) {
            throw new Error(`Path ${path} is not a file`);
        }
        const modifiedAt = stat.mtime.getTime();
        const basename = path_1.default.basename(path);
        const ext = path_1.default.extname(path).replace(".", "");
        let language;
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
    import(fileName, templateOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = this.getPath(fileName);
            const meta = this.getMeta(path);
            const source = fs_1.default.readFileSync(path, "utf-8");
            let transpiled;
            if (meta.language === "TypeScript") {
                transpiled = typescript_1.default.transpileModule(source, {
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
            const template = handlebars_1.default.compile(transpiled);
            const output = template(templateOptions);
            const outFile = path_1.default.join(this.outDir, `${meta.basename}.js`);
            fs_1.default.writeFileSync(outFile, output, {
                encoding: "utf-8",
            });
            return import_fresh_1.default(outFile);
        });
    }
    writeStrategy(fileName, { contents }) {
        const path = this.getPath(fileName);
        fs_1.default.writeFileSync(path, contents, {
            encoding: "utf8",
        });
    }
    getStrategy(fileName) {
        const path = this.getPath(fileName);
        const value = fs_1.default.readFileSync(path, "utf8");
        const meta = this.getMeta(fileName);
        return {
            value,
            meta,
        };
    }
    getAllStrategies() {
        const strategyDirContents = fs_1.default.readdirSync(this.strategyDir);
        const strategyDirFiles = strategyDirContents.filter((path) => {
            path = path_1.default.join(this.strategyDir, path);
            return fs_1.default.statSync(path).isFile();
        });
        return strategyDirFiles.map((fileName) => {
            return this.getMeta(fileName);
        });
    }
}
exports.StrategyService = StrategyService;
//# sourceMappingURL=strategyService.js.map