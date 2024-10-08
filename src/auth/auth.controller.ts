import { authService } from './auth.service';
import { Request, Response, NextFunction } from 'express';
import asyncWrapper from 'express-async-handler';

class AuthController {
	signUp = asyncWrapper(
		async (req: Request, res: Response, next: NextFunction) => {
			const { user, accessToken } = await authService.signUp(req.body);
			console.log(accessToken);
			res.status(201).json({
				status: 'success',
				data: { user, accessToken },
			});
		},
	);

	signIn = asyncWrapper(
		async (req: Request, res: Response, next: NextFunction) => {
			const { email, password } = req.body;

			const { user, accessToken } = await authService.signIn(email, password);

			res.status(200).json({
				status: 'success',
				data: { user, accessToken },
			});
		},
	);
}

export const authController = new AuthController();
