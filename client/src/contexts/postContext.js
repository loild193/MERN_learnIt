import { createContext, useReducer, useState } from 'react'
import postAPI from '../api/postAPI';
import { postReducer } from '../reducers/postReducer';
import { POST_LOADED_FAILED, POST_LOADED_SUCCESS } from './constants';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
	const [postState, dispatch] = useReducer(postReducer, {
		posts: [],
		postLoading: true,
	});

	const [showAddPostModal, setShowAddPostModal] = useState(false);

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

	const PostContextData = { 
		postState, 
		getPosts,
		showAddPostModal,
		setShowAddPostModal,
	};

	return (
		<PostContext.Provider value={PostContextData}>
			{ children }
		</PostContext.Provider>
	)
}

export default PostContextProvider;