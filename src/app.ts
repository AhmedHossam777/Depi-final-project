import express, { Application } from 'express';
import morgan from 'morgan';

const app: Application = express();

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
	res.send('hello, word');
});

export default app;