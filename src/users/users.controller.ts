import { usersService } from './users.service';
import { Request, Response, NextFunction } from 'express';
import asyncWrapper from 'express-async-handler';

class UsersController {
	createUser = asyncWrapper(
		async (req: Request, res: Response, next: NextFunction) => {
			const user = await usersService.createUser(req.body);

			res.status(201).json({
				status: 'success',
				user,
			});
		}
	);

	getUser = asyncWrapper(
		async (req: Request, res: Response, next: NextFunction) => {
			const user = await usersService.getUser(req.params.id);

			res.status(200).json({
				status: 'success',
				user,
			});
		}
	);

	getAllUsers = asyncWrapper(
		async (req: Request, res: Response, next: NextFunction) => {
			const users = await usersService.getAllUsers();

			res.status(200).json({
				status: 'success',
				users,
			});
		}
	);

	updateUser = asyncWrapper(
		async (req: Request, res: Response, next: NextFunction) => {
			const user = await usersService.updateUser(req.params.id, req.body);

			res.status(200).json({
				status: 'success',
				user,
			});
		}
	);

	deleteUser = asyncWrapper(
		async (req: Request, res: Response, next: NextFunction) => {
			await usersService.deleteUser(req.params.id);

			res.status(204).json({
				status: 'success',
			});
		}
	);
}

export const usersController = new UsersController();
