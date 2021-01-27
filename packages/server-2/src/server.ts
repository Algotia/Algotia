import http from "http";
import { app } from "./app";
import exitHook from "exit-hook";
import { bootstrap } from "./utils/bootstrap";

const server = http.createServer(app);

server.listen(2008, () => {
    bootstrap();
    console.log("Listening");
});

exitHook(() => {
    server.close();
});
