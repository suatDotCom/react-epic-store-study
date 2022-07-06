export function getGames() {
  return JSON.parse(localStorage.getItem("games"));
}

export function setGames(games) {
  localStorage.setItem("games", JSON.stringify(games));
}

export function getFavoriteGames() {
  return JSON.parse(localStorage.getItem("favoriteGames"));
}

export function setFavoriteGames(favorites) {
  localStorage.setItem("favoriteGames", JSON.stringify(favorites));
}
