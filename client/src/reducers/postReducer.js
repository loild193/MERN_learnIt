import { ADD_POST, DELETE_POST, FIND_POST, POST_LOADED_FAILED, POST_LOADED_SUCCESS, UPDATE_POST } from "../contexts/constants";

export const postReducer = (state, action) => {
	const { type, payload } = action;

	switch(type) {
		case POST_LOADED_SUCCESS:
			return {
				...state,
				posts: payload,
				postLoading: false,
			};

		case POST_LOADED_FAILED:
			return {
				...state,
				posts: [],
				postLoading: false,
			};

		case ADD_POST:
			return {
				...state,
				posts: [...state.posts, payload],
			}

		case DELETE_POST: 
			return {
				...state,
				posts: state.posts.filter(post => post._id !== payload),
			}

		case FIND_POST:
			return {
				...state,
				post: payload,
			}

		case UPDATE_POST:
			const indexOfPost = state.posts.findIndex(post => post._id === payload._id);
			return {
				...state,
				posts: [
					...state.posts.slice(0, indexOfPost),
					payload,
					...state.posts.slice(indexOfPost + 1),
				],
			}
		
		default:
			return state;
	}
}