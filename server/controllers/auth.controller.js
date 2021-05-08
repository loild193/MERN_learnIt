const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// @route GET api/auth
// @desc Check if user is logged in
// @access Public

module.exports.checkUser = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password');
		if (!user)
			return res.status(400).json({
				success: false,
				message: "User not found",
			});
		
		res.json({
			success: true,
			user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal erver error",
		});
	}
}

// @route POST api/auth/register
// @desc Register user
// @access Public
module.exports.register = async (req, res) => {
	const { username, password } = req.body;

	// Simple validation
	if (!username || !password)
		return res.status(400).json({
			success: false,
			message: "Missing username and password",
		});
	
		try {
			// Check for existing user
			const user = await User.findOne({ username });
			
			if (user)
				return res.status(400).json({
					success: false,
					message: "Username already taken",
				});
			
				// All good
				const hashedPassword = await argon2.hash(password);
				const newUser = new User({
					username,
					password: hashedPassword,
				});
				await newUser.save();

				// Return token
				const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
				res.json({
					success: true,
					message: "User created successfully",
					accessToken,
				});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				message: "Internal erver error",
			});
		}
}

// @route POST api/auth/login
// @desc Login user
// @access Public
module.exports.login = async (req, res) => {
	const { username, password } = req.body;

	// Simple validation
	if (!username || !password)
		return res.status(400).json({
			success: false,
			message: "Missing username and password",
		});

	try {
		// Check for existing user
		const user = await User.findOne({ username });
		if (!user) 
			return res.status(400).json({
				success: false,
				message: "Incorrect username or password",
			});

		// Username found
		const passwordVerify = await argon2.verify(user.password, password);
		if (!passwordVerify) 
			return res.status(400).json({
				success: false,
				message: "Incorrect username or password",
			});
		
		// All goood -> return token
		const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
		res.json({
			success: true,
			message: "Login successfully",
			accessToken,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal erver error",
		});
	}
}