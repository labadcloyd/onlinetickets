import express, { NextFunction, Request, Response } from "express";
import { DatabaseConnectionError, RequestValidationError } from '../errors/.index'

export function errorHandler(
	err: Error, 
	req: Request, 
	res: Response, 
	next: NextFunction
) {
	if (err instanceof RequestValidationError || err instanceof DatabaseConnectionError) {
		return res.status(err.statusCode).json({ errors: err.serializeErrors() })
	}

	return res.status(400).json(err)
}
