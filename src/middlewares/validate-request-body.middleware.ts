import { NextFunction, Request, Response } from "express";

import Joi, { ValidationError } from "joi";

export function validateRequestBody(schema: Joi.ObjectSchema, schemaValidateAsyncOptions: Joi.AsyncValidationOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await schema.validateAsync(req.body, schemaValidateAsyncOptions);

            next();
        }catch(error){
            let statusCode: number = 500;
            let responseSendObject: Object = {message: "Something went wrong. Try again later"};

            if(error instanceof ValidationError){
                statusCode = 400;
                responseSendObject = {
                    isInvalidPayload: true, 
                    validationErrors: error.details
                }
            }

            res.status(statusCode).send(responseSendObject);
        }
    }
}