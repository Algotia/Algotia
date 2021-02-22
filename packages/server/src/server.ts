import http from "http";
import { app } from "./app";
import exitHook from "exit-hook";
import { bootstrap } from "./utils";

bootstrap().then(() => {
    const server = http.createServer(app);

    server.listen(2008, () => {
        console.log("Listening");
    });

    exitHook(() => {
        server.close();
    });
});
