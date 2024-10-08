import asyncWrapper from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { usersService } from '../users/users.service';
import { verifyToken } from '../utils/generateTokens';

interface AuthenticatedRequest extends Request {
	user?: any;
}

const auth = asyncWrapper(
	async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		// optimization for checking if user is already authenticated
		if (req.user) {
			return next();
		}

		const token = req.header('Authorization')?.replace('Bearer ', '');

		if (!token) throw new AppError('Unauthorized', 401);

		const decoded: any = verifyToken(token, process.env.JWT_SECRET!);
		const user = await usersService.getUser(decoded.id);

		if (!user) throw new AppError('Unauthorized', 401);

		req.user = user;

		next();
	},
);

export default auth;
