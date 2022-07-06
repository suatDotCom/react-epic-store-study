import React, { createContext, useMemo, useReducer } from "react";
import { IStore } from "../models/store";
import gameReducer from "./reducers/game.reducer";
import userReducer from "./reducers/user.reducer";

const combineReducers = (slices: any) => (state: any, action: any) =>
  Object.keys(slices).reduce(
    // use for..in loop, if you prefer it
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action),
    }),
    state
  );

const initialState: IStore = {
  epicGame: {
    games: [],
    favoriteGames: [],
    purchasedGames: [],
    filter: {
      searchText: "",
      filteredGames: [],
    }
  },
  users: {
    registeredUsers: [],
  },
};

const rootReducer = combineReducers({
  epicGame: gameReducer,
  users: userReducer,
});

const Store = ({ children }: any) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = useMemo(() => [state, dispatch], [state]);
  return (
    // @ts-ignore
    <Context.Provider value={store}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
