import node_path from "path";
import fs from "fs";
import { StrategyLanguages } from "@algotia/types";
import { packageJsonTemplate, tsconfigTemplate } from "./templates";
import dashify from "dashify";

interface BootstrapArgs {
    root: string;
    name: string;
    language: StrategyLanguages;
}

const bootstrap = async ({
    root,
    name,
    language,
}: BootstrapArgs): Promise<string> => {
    const strategyPath = node_path.join(root, dashify(name));

    if (fs.existsSync(strategyPath)) {
        throw new Error(`Strategy named ${name} already exists`);
    }

    fs.mkdirSync(strategyPath);
    fs.mkdirSync(node_path.join(strategyPath, "src"));
    fs.mkdirSync(node_path.join(strategyPath, "dist"));

    const pathToPackageJson = node_path.join(strategyPath, "package.json");

    const packageJsonContents = await packageJsonTemplate({ name, language });

    fs.writeFileSync(pathToPackageJson, packageJsonContents);

    const tsconfigPath = node_path.join(strategyPath, "tsconfig.json");

    const tsconfigContents = tsconfigTemplate();

    fs.writeFileSync(tsconfigPath, tsconfigContents, { encoding: "utf8" });

    return strategyPath;
};

export default bootstrap;
