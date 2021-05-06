const express = require("express");
const { connectDB } = require("./database/connectDB");
require('dotenv').config();

const authRouter = require('./routes/auth.route');
const postRouter = require('./routes/post.route');

const authMiddleware = require('./middlewares/auth.middleware');

connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/posts', authMiddleware.verifyToken, postRouter);

app.listen(
	process.env.SERVER_PORT, 
	() => console.log(`Server started on port ${process.env.SERVER_PORT}`)
);