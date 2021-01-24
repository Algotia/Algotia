import { IRequest, IResponse } from "../../../types";
import { Configurer } from "../../../utils";
import node_path from "path";
import fs from "fs";
import { body, validationResult } from "express-validator";

interface PostStrategyRequestBody {
    fileName: string;
    value: string;
}

interface PostStrategyResponseBody {
    results: boolean;
}

const validatePostStrategy = [
    body("fileName")
        .isString()
        .bail()
        .withMessage("File name must be a string")
        .custom((fileName: string) => {
            const [baseName, ext] = fileName.split(".");
            const extensions = ["ts", "js", "cjs", "mjs"];
            if (!ext) {
                throw new Error("File name must contain an extension");
            }
            if (!extensions.includes(ext)) {
                throw new Error(`Unknown file extension .${ext}`);
            }
            if (baseName.includes("/")) {
                throw new Error("File name cannot contain the character '/'");
            }
            return true;
        }),
];

const postStrategy = (configurer: Configurer) => {
    return (
        req: IRequest<never, PostStrategyResponseBody, PostStrategyRequestBody>,
        res: IResponse<PostStrategyResponseBody>
    ) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }

        const strategyDir = node_path.join(
            configurer.get("strategyDir"),
            "strategies/"
        );

        const { fileName, value } = req.body;

        const pathToFile = node_path.join(strategyDir, fileName);

        try {
            fs.writeFileSync(pathToFile, value, { encoding: "utf8" });
        } catch (err) {
            return res
                .status(500)
                .json({ results: false, errors: [err["message"]] });
        }

        return res.status(200).json({ results: true });
    };
};

export { postStrategy, validatePostStrategy };
