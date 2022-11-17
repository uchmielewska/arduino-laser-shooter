import axios from "axios";

const apiBase = axios.create({
  baseURL: "http://localhost:8080",
});

const api = {
  game: ({ shootsNumber }) =>
    apiBase.get("/start", { params: { targets: shootsNumber } }),
  result: () => apiBase.get("/result"),
};

export default api;
