import { User } from './model/user.model';
import { IUser } from './model/IUser';
import { AppError } from '../utils/AppError';

class UsersService {
	async createUser(data: IUser) {
		const user = await User.create(data);
		if (!user) throw new AppError('error while creating a user', 400);
		return user;
	}

	async getAllUsers() {
		return User.find();
	}

	async getUser(id: string) {
		const user = await User.findById(id);
		if (!user) throw new AppError('user not found', 404);
		return user;
	}

	async updateUser(id: string, data: Partial<IUser>) {
		const newUser = await User.findByIdAndUpdate(id, data, { new: true });
		if (!newUser) throw new AppError('user not found', 404);

		return newUser;
	}

	async deleteUser(id: string) {
		const newUser = await User.findByIdAndDelete(id);
		if (!newUser) throw new AppError('user not found', 404);
	}

	async getUserByEmail(email: string) {
		const user = await User.findOne({ email }).select('+password');
		if (!user) throw new AppError('user not found', 404);

		return user;
	}
}

export const usersService = new UsersService();