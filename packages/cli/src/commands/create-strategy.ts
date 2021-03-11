import { Command, flags } from "@oclif/command";
import { StrategyLanguages } from "@algotia/client";
import prompts, { PromptObject } from "prompts";
import useClient from "../utils/useClient";

export default class CreateStrategy extends Command {
    static flags = {
        name: flags.string({
            char: "n",
            description: "Name of the strategy you'd like to create.",
        }),
        language: flags.enum({
            char: "l",
            description: "Language of the strategy you'd like to create.",
            options: [
                StrategyLanguages.JavaScript,
                StrategyLanguages.TypeScript,
            ],
        }),
    };

    async run() {
        const client = await useClient();

        const { flags } = this.parse(CreateStrategy);

        const allQuestions: Record<string, PromptObject> = {
            name: {
                type: "text",
                name: "name",
                message: "What would you like to name this strategy?",
            },
            language: {
                type: "select",
                name: "language",
                message: "Which language would you like to use?",
                choices: [
                    {
                        title: StrategyLanguages.TypeScript,
                        value: StrategyLanguages.TypeScript,
                    },
                    {
                        title: StrategyLanguages.JavaScript,
                        value: StrategyLanguages.JavaScript,
                    },
                ],
            },
        };

        let questions: PromptObject[] = [];

        if (!flags.name) {
            questions.push(allQuestions.name);
        }
        if (!flags.language) {
            questions.push(allQuestions.language);
        }
        const { name, language } = await prompts(questions);

        try {
            await client.createNewStrategy({
                name,
                language,
            });

            this.log("Created strategy.");
        } catch (err) {
            console.error(err);
        }
    }
}
