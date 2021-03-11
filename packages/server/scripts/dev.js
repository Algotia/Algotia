const nodemon = require("nodemon");
const execa = require("execa");
const path = require("path");
const pm2 = require("pm2");
const TscWatchClient = require("tsc-watch/client");

pm2.list((err, list) => {
    if (err) {
        console.error(err);
    }
    for (const item of list) {
        if (item.name === "algotia-server") {
            console.log("Server is already started.");
            process.exit(0);
        }
    }
});

const tsc = new TscWatchClient();

tsc.on("first_success", () => {
    nodemon({
        script: path.resolve(__dirname, "../dist/server"),
        watch: [
            path.resolve(__dirname, "../dist/"),
            path.resolve(__dirname, "../node_modules/@algotia"),
        ],
        env: {
            NODE_ENV: "development",
        },
    })
        .on("quit", () => {
            console.log("\nQuitting nodemon.");
            tsc.kill();
            process.exit(0);
        })
        .on("restart", () => {
            console.log("Restarting...");
        });
});

tsc.start("--project", ".");
