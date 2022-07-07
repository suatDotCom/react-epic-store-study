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

export function getPurchasedGames() {
  return JSON.parse(localStorage.getItem("purchasedGames"));
}

export function setPurchasedGames(purchased) {
  localStorage.setItem("purchasedGames", JSON.stringify(purchased));
}
