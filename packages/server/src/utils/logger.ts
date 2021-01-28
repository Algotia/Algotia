import winston from "winston";
import path from "path";
import pkgDir from "pkg-dir";
import { isDev, isProd, isTest } from "./isEnv";

const logDir = path.join(pkgDir.sync(), ".internal/log");

const logFileName = (preExtension?: string) => {
    return path.join(
        logDir,
        `algotia${preExtension && `.${preExtension}`}.log`
    );
};
const { combine, timestamp, printf, colorize } = winston.format;

const template = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const consoleFormat = combine(
    colorize(),
    timestamp({ format: "MM-DD-YYYY hh:mm:ss" }),
    template
);

const fileFormat = combine(
    timestamp({ format: "MM-DD-YYYY hh:mm:ss" }),
    template
);

const logger = winston.createLogger();

if (isProd) {
    logger.add(
        new winston.transports.File({
            filename: logFileName(),
            format: fileFormat,
        })
    );
    logger.add(
        new winston.transports.Console({
            level: "error",
            format: consoleFormat,
        })
    );
}

if (isDev) {
    logger.add(
        new winston.transports.File({
            filename: logFileName("dev"),
            format: fileFormat,
        })
    );
    logger.add(new winston.transports.Console({ format: consoleFormat }));
}

if (isTest || !logger.transports.length) {
    logger.add(
        new winston.transports.Console({ silent: true, format: consoleFormat })
    );
}

export default logger;
