import express from "express";
import http from "http";
import bodyParser from "body-parser";
import { onShutdown } from "node-graceful-shutdown";
import { createApiRouter } from "./api";
import { Configurer, validateEnv, logger } from "./utils";

const app = express();
const server = http.createServer(app);
const configurer = new Configurer();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", createApiRouter(configurer));

const start = (port?: number) => {
    validateEnv();
    port = port || Number(process.env["PORT"]) || configurer.get("port");
    logger.info(`Starting http and websocket server on port ${port}`);
    logger.info(`NODE_ENV=${process.env["NODE_ENV"]}`);
    server.listen(port);
};

const stop = () => {
    return new Promise<void>((resolve) => {
        logger.info("Closing server");
        server.close(() => {
            resolve();
        });
    });
};

const shutdown = async () => {
    await stop();
};

onShutdown(shutdown);

process.once("unhandledRejection", (reason) => {
    console.log("Unhandled rejection:");
    console.log(reason);
    process.exit(1);
});

process.once("uncaughtException", (err) => {
    console.log("Error:");
    console.log(err.message);
    process.exit(1);
});

export { start, stop, app, server };

if (require.main === module) {
    start();
}
