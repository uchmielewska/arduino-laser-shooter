import axios from "axios";

const apiBase = axios.create({
  baseURL: "http://localhost:8080",
});

const api = {
  game: ({ shootsNumber }) =>
    apiBase.get("/start", { params: { targets: shootsNumber } }),

  // deleteRecipe: ({ id }) => apiBase.delete("/recipes", { data: { id } }),
  // recipe: ({ id }) => apiBase.get(`/recipes/${id}`),

  // addRecipe: ({ recipeName, recipeBody, ingredients }) =>
  //   apiBase.post("/recipes", {
  //     recipeName,
  //     recipeBody,
  //     ingredients,
  //   }),
  // editRecipe: ({ recipeId, recipeName, recipeBody, ingredients }) =>
  //   apiBase.put("/recipes", {
  //     recipeId,
  //     recipeName,
  //     recipeBody,
  //     ingredients,
  //   }),
};

export default api;
