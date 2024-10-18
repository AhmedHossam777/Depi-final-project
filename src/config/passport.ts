import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../users/model/user.model';

import dotenv from 'dotenv';
dotenv.config();

passport.use(
	new GoogleStrategy(
		{
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
			clientID: process.env.GOOGLE_CLIENT_ID as string,
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: any,
			done: any
		) => {
			try {
				let user = await User.findOne({ email: profile.emails![0].value });
				if (!user) {
					user = await User.create({
						email: profile.emails![0].value,
						displayName: profile.displayName,
						profilePhoto: profile.photos![0].value,
					});
				}
				done(null, user);
			} catch (error) {
				done(error, null);
			}
		}
	)
);

passport.serializeUser((user: any, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});
