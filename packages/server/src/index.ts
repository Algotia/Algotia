import execa from "execa";
import path from "path";

const runNpmScript = async (scriptName: string, verb?: string) => {
    await execa.command(`npm run ${scriptName}`, {
        cwd: path.resolve(__dirname, "../"),
        stdout: process.stdout,
    });
};

export default {
    start: async () => await runNpmScript("start", "Started"),
    stop: async () => await runNpmScript("stop", "Stopped"),
    restart: async () => await runNpmScript("restart", "Restarted"),
    delete: async () => await runNpmScript("delete", "Deleted"),
    monitor: async () => await runNpmScript("monitor"),
    printLogs: async () => await runNpmScript("print-logs"),
};
