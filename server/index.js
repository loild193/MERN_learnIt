const express = require("express");
const { connectDB } = require("./database/connectDB");
require('dotenv').config();
const cors = require('cors');

const authRouter = require('./routes/auth.route');
const postRouter = require('./routes/post.route');

const authMiddleware = require('./middlewares/auth.middleware');

connectDB();

const app = express();
app.use(express.json());
// app.use(cors());

// app.options('*', cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://floating-dawn-15563.herokuapp.com/api/auth");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api/auth', authRouter);
app.use('/api/posts', authMiddleware.verifyToken, postRouter);

app.listen(
	process.env.SERVER_PORT || 5000, 
	() => console.log(`Server started on port ${process.env.SERVER_PORT}`)
);