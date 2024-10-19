import express, { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import usersRouter from './users/users.router';
import authRouter from './auth/auth.router';
import productRouter from './products/product.router';
import categoryRouter from './category/category.router';
import subCategoryRouter from './subCategory/subCategory.router';
import wishlistRouter from './wishlist/wishlist.router';
import cartRouter from './cart/cart.router';

import { globalErrorHandler } from './utils/globalErrorHandler';
import { AppError } from './utils/AppError';
import passport from 'passport';
import session from 'express-session';

import './config/passport';

const app: Application = express();

const corsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
			sameSite: 'none', // Required for cross-site cookies
		},
	})
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/sub-categories', subCategoryRouter);
app.use('/api/v1/wishlist', wishlistRouter);
app.use('/api/v1/cart', cartRouter);

// Global error handler
app.use('*', (req, res, next) => {
	return next(
		new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
	);
});
app.use(globalErrorHandler);

app.get('/', (req, res) => {
	res.send('hello, word');
});

export default app;
