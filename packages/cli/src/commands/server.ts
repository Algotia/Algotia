import { Command } from "@oclif/command";
import server from "@algotia/server";

export default class Server extends Command {
    static args = [
        {
            name: "command",
            type: "enum",
            options: Object.keys(server),
            required: true,
        },
    ];

    async run() {
        const { args } = this.parse(Server);

        const serverCommand: keyof typeof server = args.command;

        await server[serverCommand]();
    }
}
