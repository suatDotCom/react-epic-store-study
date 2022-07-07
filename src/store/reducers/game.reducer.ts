import { IGame } from "../../models/epic-games";
import { IAction } from "../../models/store/IAction";
import { IEpicGameStore } from "../../models/store/IEpicGameStore";
import { IUser } from "../../models/user/IUser";
import {
  getFavoriteGames,
  getGames,
  setFavoriteGames,
  setGames,
} from "../../shared/storage/GameStorage";
import {
  getCurrentUser,
  getRegisteredUsers,
  setRegisteredUsers,
} from "../../shared/storage/UserStorage";
import {
  ADD_FAVORITE_GAMES,
  REMOVE_FAVORITE_GAMES,
  GET_FAVORITE_GAMES,
  SET_GAMES,
  SET_FILTERED_GAMES,
  SET_UNIQUE_CATEGORIES,
  SET_SEARCH_TEXT,
} from "../types/game.type";

const syncRegisteredUser = () => {
  var currentUser = getCurrentUser();
  var registeredUsersSync = (getRegisteredUsers() || []).map((user: IUser) => {
    if (user.email == currentUser?.email) {
      user.favoriteGames = getFavoriteGames();
    }

    return user;
  });

  setRegisteredUsers(registeredUsersSync);
};

const gameReducer = (state: IEpicGameStore, action: IAction) => {
  switch (action.type) {
    case SET_GAMES:
      var games: IGame[] = getGames();
      var payload = games;

      if (!games || games?.length < 1) {
        payload = action.payload;
      }

      setGames(payload);
      return {
        ...state,
        games: payload,
      };
    case GET_FAVORITE_GAMES:
      var favoriteGames: number[] = getFavoriteGames();

      return {
        ...state,
        favoriteGames,
      };
    case ADD_FAVORITE_GAMES:
      var favoriteGames: number[] = (state?.favoriteGames || []).concat(
        action.payload
      );

      var mappedGames = state.games.map((game: IGame) => {
        if (game.Id === action.payload) {
          game.Likes += 1;
        }
        return game;
      });

      setFavoriteGames(favoriteGames);
      setGames(mappedGames);
      syncRegisteredUser();
      return {
        ...state,
        favoriteGames,
      };
    case REMOVE_FAVORITE_GAMES:
      var favoriteGames = state.favoriteGames.filter((gameId: number) => {
        return gameId !== action.payload;
      });

      var mappedGames = state.games.map((game: IGame) => {
        if (game.Id === action.payload) {
          game.Likes -= 1;
        }
        return game;
      });

      setFavoriteGames(favoriteGames);
      setGames(mappedGames);
      syncRegisteredUser();
      return {
        ...state,
        favoriteGames,
      };
    case SET_FILTERED_GAMES:
      return {
        ...state,
        filter: {
          ...state.filter,
          filteredGames: action.payload,
        },
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        filter: {
          ...state.filter,
          searchText: action.payload,
        },
      };
    case SET_UNIQUE_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
