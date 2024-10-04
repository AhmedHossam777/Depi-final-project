import { Document } from 'mongoose';

export interface IUser {
	name: string;
	email: string;
	password: string;
	image: string;
}

interface UserActions {
	comparePassword(password: string): Promise<boolean>;
}

export type UserDocument = IUser & Document & UserActions;