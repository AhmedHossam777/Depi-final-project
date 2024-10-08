import jwt from 'jsonwebtoken';

export const generateAccessToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

export const verifyToken = (token: string, secret: string) => {
	return jwt.verify(token, secret); // decoded: { id: string }
};
