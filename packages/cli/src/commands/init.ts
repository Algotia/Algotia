import { useStrategyManager, internalDir } from "../utils";
import { Command, flags } from "@oclif/command";
import { config } from "@algotia/utils";
import prompts from "prompts";
import cliUx from "cli-ux";
import path from "path";
import fs from "fs";
import os from "os";

export default class Init extends Command {
    async init() {
        if (!fs.existsSync(internalDir)) {
            fs.mkdirSync(internalDir);
        }
    }

    static flags = {
        force: flags.boolean({ char: "f" }),
    };

    async run() {
        const { flags } = this.parse(Init);

        if (config.has("appDir")) {
            const appDir = config.get("appDir");
            if (flags.force) {
                const answer = await prompts({
                    type: "confirm",
                    name: "confirm",
                    message:
                        "Are you sure you'd like to re-initialize? This will permanently delete your strategies.",
                });
                if (answer.confirm) {
                    fs.rmdirSync(appDir, { recursive: true });
                } else {
                    return this.exit();
                }
            } else {
                this.log(`Already initialized at ${appDir}`);
                return this.exit();
            }
        }

        const { appDir } = await prompts({
            type: "select",
            name: "appDir",
            message: "Where would you like to create the Algotia directory?",
            choices: [
                {
                    value: path.join(os.homedir(), "algotia"),
                    title: path.join(os.homedir(), "algotia"),
                },
            ],
        });

        config.set("appDir", appDir);

        const strategyManager = useStrategyManager();

        cliUx.action.start("Installing dependencies");

        await strategyManager.bootstrap();

        cliUx.action.stop();
    }
}
