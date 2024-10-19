import jwt from 'jsonwebtoken';

export const generateAccessToken = (id: string) => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: '200m',
	});
};

export const verifyToken = (token: string, secret: string) => {
	return jwt.verify(token, secret); // decoded: { id: string }
};
