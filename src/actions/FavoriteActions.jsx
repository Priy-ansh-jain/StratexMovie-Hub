// favoriteActions.js
export const addToFavorites = (movie) => ({
  type: "ADD_TO_FAVORITES",
  payload: movie,
});

export const removeFromFavorites = (movie) => ({
  type: "REMOVE_FROM_FAVORITES",
  payload: movie,
});
