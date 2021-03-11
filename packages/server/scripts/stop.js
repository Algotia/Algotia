const pm2 = require("pm2");

pm2.list((err, list) => {
    if (err) {
        console.error(err);
    }
    for (const item of list) {
        if (item.name !== "algotia-server") {
            console.log("No process named algotia-server is started.");
            process.exit(0);
        }
    }
});

pm2.connect((err) => {
    if (err) {
        console.error(err);
    }
    pm2.stop("algotia-server", (err) => {
        if (err) {
            console.error(err);
        }
        console.log("Stopped algotia server.");
        process.exit(0);
    });
});
