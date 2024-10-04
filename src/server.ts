import app from './app';
import { connectDb } from './config/connect-db';

const port = 3000;

app.listen(port, async () => {
	await connectDb();
	console.log(`app is running on port ${port}`);
});