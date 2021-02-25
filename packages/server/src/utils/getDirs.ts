import pkgDir from "pkg-dir";
import node_path from "path";
import { ConfigService } from "../services";

export const getInternalDir = (): string => {
    return node_path.join(pkgDir.sync(__dirname), ".internal/");
};

export const getStrategyDir = (): string => {
    const configService = new ConfigService();
    const appDir = configService.get("appDir");
    return node_path.join(appDir, "strategies");
};

export const getCacheDir = (): string => {
    return node_path.join(getInternalDir(), "cache/");
};

