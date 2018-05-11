import { Action } from '@ngrx/store'
import { UserModel } from 'src/app/models/user-model/user-model'
import * as UserActions from './../actions/user-action'

const initialState: UserModel = {
    userId: 0,
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    description: '',
    department: '',
    team: ''
}

export function reducer(state: UserModel[] = [], action: UserActions.Actions) {

    switch (action.type) {
        case UserActions.ADD_USER:         
            return [...state, action.payload];

        case UserActions.DELETE_USER:
            state.splice(action.payload, 1);
            return state;

        // case UserActions.GET_USER_LIST:
        //     return [...state, action.payload];

        // case UserActions.GET_USER:            
        //     return [...state, action.payload];

        // case UserActions.UPDATE_USER:             
        //     return [...state, action.payload];

        default:
            return state;
    }
}