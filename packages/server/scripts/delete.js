const pm2 = require("pm2");
const path = require("path");

pm2.connect((err) => {
    if (err) {
        console.error(err);
    }
    pm2.list((err, list) => {
        if (err) {
            console.error(err);
        }
        if (!list.length) {
            console.log("No running processes.");
            process.exit(0);
        }

        for (const item of list) {
            if (item.name !== "algotia-server") {
                console.log("No process named algotia-server is started.");
                process.exit(0);
            }
        }
        pm2.delete("algotia-server", (err) => {
            if (err) {
                console.error(err);
            }
			console.log("Removed algotia server from the process manager.")
            process.exit(0);
        });
    });
});
