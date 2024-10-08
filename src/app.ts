import express, { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import usersRouter from './users/users.router';
import authRouter from './auth/auth.router';
import productRouter from './products/product.router';
import categoryRouter from './category/category.router';
import subCategoryRouter from './subCategory/subCategory.router';
import wishlistRouter from './wishlist/wishlist.router';

import { globalErrorHandler } from './utils/globalErrorHandler';
import { AppError } from './utils/AppError';

const app: Application = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/sub-categories', subCategoryRouter);
app.use('/api/v1/wishlist', wishlistRouter);

// Global error handler
app.use('*', (req, res, next) => {
	return next(
		new AppError(`Can't find ${req.originalUrl} on this server!`, 404),
	);
});
app.use(globalErrorHandler);

app.get('/', (req, res) => {
	res.send('hello, word');
});

export default app;
