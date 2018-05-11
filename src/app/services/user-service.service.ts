import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model/user-model'
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: UserModel = new UserModel();
  userList: UserModel[] = [];
  baseUrl: string = "https://zware-ngnewapi.azurewebsites.net/api/jhavikas84_at_gmail.com/profiles";

  constructor(private http: Http) { }

  postUser(user: UserModel) {
    var body = JSON.stringify(user);
    console.log("UserList: " + body);
    
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(this.baseUrl, body, requestOptions);
  }

  putUser(userId, user) {
    var body = JSON.stringify(user);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });

    return this.http.put( this.baseUrl + '/' + userId, body, requestOptions);
  }
  getUserList() {
    this.http.get(this.baseUrl)
      .subscribe((data: Response) => {
        console.log("UserList: " + data);
        this.userList = data.json() as UserModel[];
        return this.userList;    
      })
  }

  deleteUser(userId: number) {
    return this.http.delete( this.baseUrl + '/' + userId);
  }
}
