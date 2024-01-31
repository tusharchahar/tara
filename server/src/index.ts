import cors from 'cors';
import express from 'express';
import { services } from './services';
import mongoose from 'mongoose';

const app = express();
const MONGO_URL='mongodb+srv://tusharchahar:X4LE73swa5yF*Aq@cluster.aab0tfl.mongodb.net/tara?retryWrites=true&w=majority';

// middleware for json parsing
app.use(express.json());

// middleware for allow cross origin request
app.use(cors());


app.use('/api', services);

mongoose.connection.on('open',()=>{
	console.log('connected to database');
})

const port = process.env.PORT || 8081;
(async()=>{
	await mongoose.connect(MONGO_URL);
	app.listen(port, () =>
	console.log(`application is running on :${port}`)
);
})();



