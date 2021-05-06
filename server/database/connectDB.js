
const mongoose = require('mongoose');

module.exports.connectDB = async () => {
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