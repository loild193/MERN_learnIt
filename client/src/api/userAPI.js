import axiosClient from "./axiosClient";

const userAPI = {
  login: (userInfo) => {
    const url = "/auth/login";

    return axiosClient.post(url, userInfo);
  },
  checkUser: () => {
    const url = "/auth";

    return axiosClient.get(url);
  }
};

export default userAPI;