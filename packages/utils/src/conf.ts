import { ConfigOptions } from "@algotia/types";
import Conf from "conf";

export const config = new Conf<ConfigOptions>({
    projectSuffix: "",
    schema: {
        appDir: {
            type: "string",
        },
        server: {
            type: "object",
            properties: {
                port: {
                    type: "number",
                    minimum: 1,
                    maximum: 65535,
                },
            },
        },
    },
    defaults: {
        appDir: undefined,
        server: {
            port: 2008,
        },
    },
});
