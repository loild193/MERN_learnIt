const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Post = require('../models/Post');

// @route POST api/posts
// @desc Create post
// @access Private
module.exports.createPost = async (req, res) => {
	const { title, description, url, status } = req.body;

	// Simple validation
	if (!title)
		return res.status(400).json({
			success: false,
			message: "Title is required",
		});
	
	try {
		const newPost = new Post({
			title,
			description,
			url: url.startsWith('https://') ? url : `https://${url}`,
			status: status || 'TO LEARN',
			user: req.userId,
		});

		await newPost.save();

		res.json({
			success: true,
			message: "Happy learning",
			post: newPost,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal erver error",
		});
	}
}

// @route GET api/posts
// @desc Get post
// @access Private
module.exports.getPost = async (req, res) => {
	try {
		const posts = await Post.find({ user: req.userId }).populate('user', ['username']);
		res.json({
			success: true,
			posts,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal erver error",
		});
	}
}