import { IGame } from "../epic-games";

export interface IUser {
    email: string,
    password: string
    purchasedGames?: Array<number>,
    favoriteGames?: Array<number>
}
