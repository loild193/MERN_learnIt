import { createContext, useReducer, useState } from 'react'
import postAPI from '../api/postAPI';
import { postReducer } from '../reducers/postReducer';
import { 
	POST_LOADED_FAILED, 
	POST_LOADED_SUCCESS, 
	ADD_POST, 
	DELETE_POST,
	UPDATE_POST,
	FIND_POST,
} from './constants';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
	const [postState, dispatch] = useReducer(postReducer, {
		post: null,
		posts: [],
		postLoading: true,
	});

	const [showAddPostModal, setShowAddPostModal] = useState(false);
	const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
	const [showToast, setShowToast] = useState({
		show: false,
		message: "",
		type: null,
	});

	// get all posts
	const getPosts = async () => {
		try {
			const response = await postAPI.getPosts();
			if (response.success) {
				dispatch({
					type: POST_LOADED_SUCCESS,
					payload: response.posts,
				});
			}
		} catch (error) {
			dispatch({
				type: POST_LOADED_FAILED,
			})
		}
	}

	// add new post
	const addNewPost = async (newPost) => {
		try {
			const response = await postAPI.addPost(newPost);
			if (response.success) {
				dispatch({
					type: ADD_POST,
					payload: response.post,
				});
				return response;
			}
		} catch (error) {
			return error.response.data ? error.response.data : { success: false, message: "Server error"};
		}
	}

	// delete post
	const deletePost = async postId => {
		try {
			const response = await postAPI.deletePost(postId);
			if (response.success) {
				dispatch({
					type: DELETE_POST,
					payload: postId,
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	// find post when user want to update post
	const findPost = postId => {
		const post = postState.posts.find(post => post._id === postId);
		dispatch({
			type: FIND_POST,
			payload: post,
		});
	}

	// update post
	const updatePost = async updatedPost => {
		try {
			const response = await postAPI.updatePost(updatedPost);
			if (response.success) {
				dispatch({
					type: UPDATE_POST,
					payload: response.post,
				});
				return response;
			}
		} catch (error) {
			return error.response.data ? error.response.data : { success: false, message: "Server error"};
		}
	}

	const PostContextData = { 
		postState, 
		getPosts,
		showAddPostModal,
		setShowAddPostModal,
		addNewPost,
		showToast,
		setShowToast,
		deletePost,
		updatePost,
		findPost,
		showUpdatePostModal,
		setShowUpdatePostModal,
	};

	return (
		<PostContext.Provider value={PostContextData}>
			{ children }
		</PostContext.Provider>
	)
}

export default PostContextProvider;