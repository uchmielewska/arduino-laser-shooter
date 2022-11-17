import api from "../api";

export const startGameApi = async ({ shootsNumber }) => {
  return api.game({
    shootsNumber,
  });
};
