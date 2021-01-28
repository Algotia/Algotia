import Joi, { ErrorReport } from "joi";

class EnvironmentVariableError extends Error {
    constructor(name: string, errs: ErrorReport[]) {
        super(
            `Invalid environment variable:\n    Name: ${name}\n    Reason: ${errs[0]}`
        );
        delete this.stack;
    }
}

const validateEnv = () => {
    const NODE_ENV = process.env["NODE_ENV"];
    const PORT = process.env["PORT"];

    Joi.assert(
        NODE_ENV,
        Joi.valid("production")
            .valid("development")
            .valid("test")
            .valid("ci")
            .error((errs) => {
                return new EnvironmentVariableError("NODE_ENV", errs);
            })
            .required()
    );

    if (PORT) {
        Joi.assert(PORT, Joi.number().port());
    }
};

export default validateEnv;
