import { ADD_POST, POST_LOADED_FAILED, POST_LOADED_SUCCESS } from "../contexts/constants";

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
		
		default:
			return state;
	}
}