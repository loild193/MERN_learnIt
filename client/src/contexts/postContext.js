import { createContext, useReducer, useState } from 'react'
import postAPI from '../api/postAPI';
import { postReducer } from '../reducers/postReducer';
import { POST_LOADED_FAILED, POST_LOADED_SUCCESS, ADD_POST } from './constants';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
	const [postState, dispatch] = useReducer(postReducer, {
		posts: [],
		postLoading: true,
	});

	const [showAddPostModal, setShowAddPostModal] = useState(false);
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

	const PostContextData = { 
		postState, 
		getPosts,
		showAddPostModal,
		setShowAddPostModal,
		addNewPost,
		showToast,
		setShowToast,
	};

	return (
		<PostContext.Provider value={PostContextData}>
			{ children }
		</PostContext.Provider>
	)
}

export default PostContextProvider;