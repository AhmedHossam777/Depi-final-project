import { authService } from './auth.service';
import { Request, Response } from 'express';

class AuthController {
	async signUp(req: Request, res: Response) {
		const { user, accessToken } = await authService.signUp(req.body);
		res.status(201).json({
			status: 'success',
			data: { user, accessToken },
		});
	}

	async signIn(req: Request, res: Response) {
		const { email, password } = req.body;

		const { user, accessToken } = await authService.signIn(email, password);
		res.status(200).json({
			status: 'success',
			data: { user, accessToken },
		});
	}
}

export const authController = new AuthController();