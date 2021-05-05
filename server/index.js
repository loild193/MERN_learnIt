const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();

const authRouter = require('./routes/auth.route');

const connectDB = async () => {
	try {
		await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.3klng.mongodb.net/mern-learnit?retryWrites=true&w=majority`, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		console.log("MongoDB connected");
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
}

connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));