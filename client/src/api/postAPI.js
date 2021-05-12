import axiosClient from "./axiosClient";

const postAPI = {
  getPosts: () => {
		const url = "/posts";

		return axiosClient.get(url);
	},
	addPost: newPost => {
		const url = "/posts";

		return axiosClient.post(url, newPost);
	},
	deletePost: id => {
		const url = `/posts/${id}`;

		return axiosClient.delete(url);
	},
};

export default postAPI;