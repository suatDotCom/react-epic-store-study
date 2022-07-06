import { IUser } from "../user/IUser";

export interface IUsersStore {
    registeredUsers: Array<IUser>,
    currentUser?: IUser
}
