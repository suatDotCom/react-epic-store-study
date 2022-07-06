export const GameService = {
  getAll: function () {
    return fetch("simple_game_store_db.json")
  },
};
