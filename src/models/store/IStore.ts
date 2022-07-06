import { IEpicGameStore } from "./IEpicGameStore";
import { IUsersStore } from "./IUsersStore";

export interface IStore {
  epicGame: IEpicGameStore,
  users: IUsersStore
}
