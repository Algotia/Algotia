import { NextFunction } from "express";
import { IRequest, IResponse } from "../../types";
import { Configurer } from "../../utils";

export const requireInit = (configurer: Configurer) => {
    return (req: IRequest, res: IResponse, next: NextFunction) => {
        if (!configurer.has("strategyDir")) {
            //TODO: Document this status code
            return res.status(475).json({
                error: `Must call POST /api/init before calling /api/${req.path}`,
            });
        }
        return next();
    };
};
