import * as express from 'express';

type expressMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => void;

export const asyncMiddleware = (fn: expressMiddleware) => 
	(req: express.Request, res: express.Response, next: express.NextFunction) => 
		Promise
			.resolve(fn(req, res, next))
			.catch(next);
