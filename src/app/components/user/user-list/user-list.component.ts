import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserService } from '../../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../../models/user-model/user-model'
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/interfaces/iapp-state";
import * as UserActions from 'src/app/actions/user-action'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: Observable<UserModel[]>;
  
  constructor(private userService: UserService, 
              private toastr: ToastrService,
              private store: Store<IAppState>) {
                this.userList = store.select('users');
               }

  ngOnInit() {
    //this.userService.getUserList();
    this.store.dispatch(new UserActions.GetUserList());
    
  }

  showForEdit(user: UserModel) {
    this.userService.selectedUser = Object.assign({}, user);;
  }

  onDelete(userId: number) {
    if (confirm('Are you sure to delete this record ?') == true) {    

      this.userService.deleteUser(userId)
      .subscribe(x => {
        this.userService.getUserList();
        this.toastr.warning("Deleted Successfully","User Register");
      })
    }
  }

  showForEditFromStore(user:UserModel){
    var theUser = this.store.select( u => u.users.find( x => x.userId == user.userId))
      .subscribe( (data: UserModel) => {
        this.userService.selectedUser = data;
      });   
  }

  onDeleteFromStore(userId: number) {
    if (confirm('Are you sure to delete this record ?') == true) {   
      this.store.dispatch(new UserActions.DeleteUser(userId));
    }
  }

}