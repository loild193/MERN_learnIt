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

// @route PUT api/posts
// @desc Update post
// @access Private
module.exports.updatePost = async (req, res) => {
	const { title, description, url, status } = req.body;

	// Simple validation
	if (!title)
		return res.status(400).json({
			success: false,
			message: "Title is required",
		});
	
	try {
		let updatedPost = {
			title,
			description: description || '',
			url: (url.startsWith('https://') ? url : `https://${url}` || ''),
			status: status || 'TO_LEARN',
		};
		const postUpdateCondition = {
			_id: req.params.id,
			user: req.userId,
		};

		updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true });
		
		// User not authorized to update post or post not found
		if (!updatedPost)
			return res.status(401).json({
				success: false,
				message: "Post not found or user not authorized",
			})

		res.json({
			success: true,
			message: "Exellent progress",
			post: updatedPost,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal erver error",
		});
	}
}

// @route DELETE api/posts
// @desc Delete post
// @access Private
module.exports.deletePost = async (req, res) => {
	try {
		const postDeleteCondition = {
			_id: req.params.id,
			user: req.userId,
		};
		const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

		// User not authorized to update post or post not found
		if (!deletedPost)
			return res.status(401).json({
				success: false,
				message: "Post not found or user not authorised",
			});

		res.json({
			success: true,
			post: deletedPost,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: "Internal erver error",
		});
	}
}