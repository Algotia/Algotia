import express, {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from "express";
import bodyParser from "body-parser";
import { ValidateError } from "tsoa";
import cors from "cors";
import { RegisterRoutes } from "./routes";
import chalk from "chalk";
import { Counter } from "./utils";

export const app = express();

const errCounter = new Counter();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//TODO: whitelist docs domain etc
app.use(cors());

app.use(bodyParser.json());

RegisterRoutes(app);

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {
    errCounter.incr();
    console.log(
        `Error #${errCounter.getCount()}-------------------------------------`
    );
    console.log(chalk.red(`Error (${res.statusCode})`));
    console.log(chalk.yellow("Path: "), req.path);
    Object.keys(req.params).length &&
        console.log(chalk.yellow("Params: "), req.params);
    Object.keys(req.body).length &&
        console.log(chalk.yellow("Body: "), req.body);
    Object.keys(req.query).length &&
        console.log(chalk.yellow("Query: "), req.query);
    console.error(err);
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
    console.log(
        `Error #${errCounter.getCount()}-------------------------------------`
    );

    next();
});
