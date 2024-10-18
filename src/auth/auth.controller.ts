import { authService } from './auth.service';
import { Request, Response, NextFunction } from 'express';
import asyncWrapper from 'express-async-handler';
import { UserDocument } from '../users/model/IUser';

interface AuthenticatedRequest extends Request {
	user?: any;
}

class AuthController {
	signUp = asyncWrapper(
		async (req: Request, res: Response, next: NextFunction) => {
			const { user, accessToken } = await authService.signUp(req.body);
			res.status(201).json({
				status: 'success',
				data: { user, accessToken },
			});
		}
	);

	signIn = asyncWrapper(
		async (req: Request, res: Response, next: NextFunction) => {
			const { email, password } = req.body;

			const { user, accessToken } = await authService.signIn(email, password);

			res.status(200).json({
				status: 'success',
				data: { user, accessToken },
			});
		}
	);

	handleOAuthSuccess = asyncWrapper(
		async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
			const user = req.user as UserDocument;
			const token = await authService.authenticateUser(user);

			res.status(200).json({
				status: 'success',
				data: { user, token },
			});
		}
	);
}

export const authController = new AuthController();
