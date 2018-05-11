import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserService } from '../../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../../models/user-model/user-model'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userService.getUserList();
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

}
