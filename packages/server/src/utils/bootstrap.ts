import { config } from "@algotia/utils";
import fs from "fs";

export const bootstrap = async () => {
    if (!config.has("appDir")) {
        throw new Error(
            "You must call algotia init before starting the server."
        );
    }
};
