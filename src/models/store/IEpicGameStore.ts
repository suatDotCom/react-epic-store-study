import { IGame } from "../epic-games";
import { IUser } from "../user/IUser";

export interface IEpicGameStore {
    games: Array<IGame>,
    favoriteGames: Array<number>,
    purchasedGames: Array<number>,
    filter: {
        searchText?: string,
        filteredGames?: Array<IGame>
    }
}
