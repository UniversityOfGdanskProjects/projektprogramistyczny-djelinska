require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/movieRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);

const port = process.env.PORT || 5000;
const server = http.createServer(app);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		server.listen(port, () => {
			console.log(
				`Serwer połączony z bazą danych i uruchomiony na porcie ${port}`
			);
		});
	})
	.catch((error) => console.log(error));
