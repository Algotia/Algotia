const pm2 = require("pm2");
const path = require("path");

pm2.list((err, list) => {
    if (err) {
        throw err;
    }

    for (const item of list) {
        if (item.name === "algotia-server") {
            console.log("Algotia server is already started.");
            process.exit(0);
        }
    }

    pm2.start(
        {
            script: path.resolve(__dirname, "../dist/server.js"),
            env: {
                NODE_ENV: "production",
            },
            name: "algotia-server",
        },
        (err) => {
            if (err) {
                console.error(err);
            }
            console.log("Started algotia server.");
            process.exit(0);
        }
    );
});
