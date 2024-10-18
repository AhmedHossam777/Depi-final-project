import { usersService } from '../users/users.service';
import { generateAccessToken } from '../utils/generateTokens';
import { IUser, UserDocument } from '../users/model/IUser';
import { AppError } from '../utils/AppError';

class AuthService {
	signUp = async (userData: IUser) => {
		const user = await usersService.createUser(userData);
		if (!user) {
			throw new AppError('error while creating a user', 400);
		}
		const accessToken = generateAccessToken(user._id as string);
		return { user, accessToken };
	};

	signIn = async (email: string, password: string) => {
		const user = await usersService.getUserByEmail(email);
		if (!user) {
			throw new AppError('User not found', 404);
		}
		const isMatch = await user.comparePassword(password);

		if (!isMatch) {
			throw new AppError('Invalid password', 400);
		}
		const accessToken = generateAccessToken(user._id as string);
		return { user, accessToken };
	};

	authenticateUser = async (user: UserDocument) => {
		const token = generateAccessToken(user._id as string);
		return token;
	};
}

export const authService = new AuthService();
