"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const exit_hook_1 = __importDefault(require("exit-hook"));
const bootstrap_1 = require("./utils/bootstrap");
const server = http_1.default.createServer(app_1.app);
server.listen(2008, () => {
    bootstrap_1.bootstrap();
    console.log("Listening");
});
exit_hook_1.default(() => {
    server.close();
});
//# sourceMappingURL=server.js.map