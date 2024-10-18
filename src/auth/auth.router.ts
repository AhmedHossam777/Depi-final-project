import { Router } from 'express';

import { authController } from './auth.controller';

import passport from 'passport';

const router = Router();

router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/api/auth/failure	' }),
	authController.handleOAuthSuccess
);

router.get('/failure', (req, res) => {
	res.status(401).json({ message: 'Authentication Failed' });
});

export default router;
