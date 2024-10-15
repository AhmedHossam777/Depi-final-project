import { AppError } from '../utils/AppError';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
	user?: any;
}

export const isAdmin = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	if (req.user.role !== 'admin') {
		return next(new AppError('Unauthorized', 401));
	}

	next();
};