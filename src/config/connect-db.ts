import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDb = async () => {
	try {
		await mongoose.connect(process.env.DB_URI as string);
		console.log('connect to db successfully');
	} catch (e) {
		console.log(e);
	}
};