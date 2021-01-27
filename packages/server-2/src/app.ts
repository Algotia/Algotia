import express, {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from "express";
import bodyParser from "body-parser";
import { ValidateError } from "tsoa";
import cors from "cors";

export const app = express();


app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//TODO: whitelist docs domain etc
app.use(cors());

app.use(bodyParser.json());

require("../dist/routes").RegisterRoutes(app);

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {
    console.log(err);
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

    next();
});
