import fs from "fs";
import node_path from "path";
import { FileStructure, EditorLanguages } from "@algotia/types";
import tildify from "tildify";

export const mkDirIfNotExist = (path: string | string[]) => {
    const mkDir = (p: string) => {
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    };

    if (Array.isArray(path)) {
        for (const singlePath of path) {
            mkDir(singlePath);
        }
    } else if (typeof path === "string") {
        mkDir(path);
    } else {
        throw new TypeError("Expected string or array of strings");
    }
};

export const mergeJsonStrings = (packages: string[]) => {
    let merged = "";

    for (const pkg of packages) {
        const parsedMerged = JSON.parse(merged);
        const parsedTarget = JSON.parse(pkg);
        merged = JSON.stringify(Object.assign(parsedMerged, parsedTarget));
    }

    return merged;
};

const ignore = fs
    .readFileSync(node_path.resolve(__dirname, "../.gitignore"), "utf8")
    .trim()
    .split("\n")
    .map((cannonicalPath) => node_path.basename(cannonicalPath));

export const walkDir = (dir: string): FileStructure => {
    const walk = (dirName: string) => {
        const dirContents = fs.readdirSync(dirName).filter((fileName) => {
            return !ignore.includes(node_path.basename(fileName));
        });
        return dirContents.map((relativePath) => {
            const fullPath = node_path.join(dirName, relativePath);
            const stat = fs.statSync(fullPath);
            if (stat.isFile()) {
                return {
                    id: relativePath,
                    name: relativePath,
                    fullPath,
                    language: parseLanguageFromExt(
                        node_path.extname(relativePath)
                    ),
                };
            } else if (stat.isDirectory()) {
                return {
                    id: relativePath,
                    name: relativePath,
                    children: walk(fullPath),
                    fullPath,
                };
            }
        });
    };
    return {
        name: tildify(dir),
        id: dir,
        fullPath: dir,
        children: walk(dir),
    };
};

export const parseLanguageFromExt = (extension: string): EditorLanguages => {
    extension = extension.slice(1);
    switch (extension) {
        case "mjs":
        case "cjs":
        case "js":
            return EditorLanguages.JavaScript;
        case "ts":
            return EditorLanguages.TypeScript;
        case "json":
            return EditorLanguages.JSON;
        case "txt":
            return EditorLanguages.Text;
    }
};


export const getLocalDependencyPath = (depName: string) => {
    const node_modules = node_path.resolve(__dirname, "../node_modules/");

    const depPath = node_path.join(node_modules, depName);

    if (!fs.existsSync(depPath)) {
        throw new Error(`Dependency ${depName} is not installed`);
    }

    return fs.realpathSync(depPath);
};
