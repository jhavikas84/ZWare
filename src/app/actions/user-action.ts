import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { UserModel } from 'src/app/models/user-model/user-model'


export const ADD_USER = 'AddUser'
export const DELETE_USER = 'DeleteUser'
export const UPDATE_USER = 'UpdateUser'
export const GET_USER = 'GetUser'
export const GET_USER_LIST = 'GetUserList'


export class AddUser implements Action {
  readonly type = ADD_USER

  constructor(public payload: UserModel) { }
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER
  userId:number;
  constructor(public payload: number) {
    this.userId = payload;
   }
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER

  constructor(public payload: UserModel) { }
}

export class GetUser implements Action {
  readonly type = GET_USER
  userId:number;
  constructor(public payload: number) {
    this.userId = payload;
   }
}

export class GetUserList implements Action {
  readonly type = GET_USER_LIST

  constructor(public payload?: any) { }
}

export type Actions = AddUser | DeleteUser | UpdateUser | GetUser | GetUserList;