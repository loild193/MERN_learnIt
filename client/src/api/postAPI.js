import axiosClient from "./axiosClient";

const postAPI = {
  getPosts: () => {
		const url = "/posts";

		return axiosClient.get(url);
	},
	addPost: (newPost) => {
		const url = "/posts";

		return axiosClient.post(url, newPost);
	},
};

export default postAPI;