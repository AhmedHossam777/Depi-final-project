import express, { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import usersRouter from './users/users.router';
import authRouter from './auth/auth.router';

const app: Application = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
	res.send('hello, word');
});

export default app;