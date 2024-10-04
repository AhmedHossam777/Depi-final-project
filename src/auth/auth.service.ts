import { usersService } from '../users/users.service';
import { generateAccessToken } from '../utils/generateTokens';
import { IUser } from '../users/model/IUser';

class AuthService {
	async signUp(userData: IUser) {
		const user = await usersService.createUser(userData);
		const accessToken = generateAccessToken(user!._id as string);
		return { user, accessToken };
	}

	async signIn(email: string, password: string) {
		const user = await usersService.getUserByEmail(email);
		if (!user) {
			throw new Error('User not found');
		}
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			throw new Error('Invalid password');
		}
		const accessToken = generateAccessToken(user._id as string);
		return { user, accessToken };
	}
}

export const authService = new AuthService();