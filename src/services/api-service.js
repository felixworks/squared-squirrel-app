import config from "../config";

const apiService = {
  postUser(username) {
    return fetch(`${config.API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ username: username })
    }).then(res => (!res.ok ? e => Promise.reject(e) : res.json()));
  },

  getUserStatistics(username) {
    return fetch(
      `${config.API_BASE_URL}/users/single/statistics?username=${username}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      }
    ).then(res => (!res.ok ? e => Promise.reject(e) : res.json()));
  }
};

export default apiService;
