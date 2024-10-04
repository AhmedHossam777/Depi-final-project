import { User } from './model/user.model';
import { IUser } from './model/IUser';

class UsersService {
	async createUser(data: IUser) {
		try {
			return await User.create(data);
		} catch (e) {
			console.log(e);
		}
	}

	async getAllUsers() {
		return User.find();
	}

	async getUser(id: string) {
		const user = await User.findById(id);
		if (!user) throw new Error('user not found');
		return user;
	}

	async updateUser(id: string, data: Partial<IUser>) {
		const newUser = await User.findByIdAndUpdate(id, data, { new: true });
		if (!newUser) throw new Error('error while updating user');

		return newUser;
	}

	async deleteUser(id: string) {
		const newUser = await User.findByIdAndDelete(id);
		if (!newUser) throw new Error('error while deleting user');
	}

	async getUserByEmail(email: string) {
		return User.findOne({ email }).select('+password');
	}
}

export const usersService = new UsersService();