import http from "http";
import { app } from "./app";
import exitHook from "exit-hook";
import { bootstrap } from "./utils";
import { config } from "@algotia/utils";

bootstrap()
    .then(() => {
        const server = http.createServer(app);
        const port = config.get("server").port;

        server.listen(port, () => {
            console.log(`Started server on port ${port}`);
        });

        exitHook(() => {
            server.close();
        });
    })
    .catch((err) => {
        console.log(err);
    });
