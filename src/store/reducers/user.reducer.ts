import { IAction } from "../../models/store/IAction";
import { IUsersStore } from "../../models/store/IUsersStore";
import { IUser } from "../../models/user/IUser";
import {
  getFavoriteGames,
  setFavoriteGames,
  setPurchasedGames,
} from "../../shared/storage/GameStorage";
import {
  getRegisteredUsers,
  removeCurrentUser,
  setCurrentUser,
  setRegisteredUsers,
} from "../../shared/storage/UserStorage";
import { ADD_USER, SET_USERS, LOGIN, LOGOUT } from "../types/user.type";

const userReducer = (state: IUsersStore, action: IAction) => {
  switch (action.type) {
    case LOGIN:
      setCurrentUser(action.payload);

      var user: IUser = getRegisteredUsers().filter(
        (item: IUser) => item.email == action.payload.email
      )[0];
      setFavoriteGames(user.favoriteGames);
      setPurchasedGames(user.purchasedGames);

      return {
        ...state,
        currentUser: action.payload,
      };
    case LOGOUT:
      removeCurrentUser();

      return {
        ...state,
        currentUser: {},
      };
    case SET_USERS:
      return {
        ...state,
        registeredUsers: action.payload,
      };
    case ADD_USER:
      var registeredUsers = (getRegisteredUsers() || []).concat(action.payload);
      setRegisteredUsers(registeredUsers);

      return {
        ...state,
        registeredUsers,
      };
    default:
      return state;
  }
};

export default userReducer;
