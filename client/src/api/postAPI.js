import axiosClient from "./axiosClient";

const postAPI = {
  getPosts: () => {
		const url = "/posts";

		return axiosClient.get(url);
	},
};

export default postAPI;