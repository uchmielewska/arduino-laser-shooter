import axios from "axios";

const apiBase = axios.create({
  baseURL: "http://localhost:8080",
});

const api = {
  game: ({ targetNumber }) =>
    apiBase.get("/start", { params: { targets: targetNumber } }),
  result: () => apiBase.get("/result"),
};

export default api;
