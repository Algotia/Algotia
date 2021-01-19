import { Response as IRes, Request } from "express";
import { ValidationError } from "express-validator";

export { Request as IRequest };

export interface ErrorRes {
    errors?: (ValidationError | string)[];
}

export type IResponse<ResBody = any> = IRes<ResBody | ErrorRes>;
