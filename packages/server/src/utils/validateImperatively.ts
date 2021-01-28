import { validationResult, ValidationChain } from "express-validator";

const validateImperatively = (validations: ValidationChain[]) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.array().length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

export default validateImperatively;
