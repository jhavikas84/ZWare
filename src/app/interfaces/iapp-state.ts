import { UserModel } from "src/app/models/user-model/user-model";

export interface IAppState {
    readonly users: UserModel[];
}
