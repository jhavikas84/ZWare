import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgForm } from '@angular/forms'
import { UserService } from '../../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../../models/user-model/user-model'
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/iapp-state';
import * as UserActions from 'src/app/actions/user-action'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private userService: UserService,
    private toastr: ToastrService,
    private store: Store<IAppState>) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.userService.selectedUser = {
      userId: null,
      firstName: '',
      lastName: '',
      displayName: '',
      email: '',
      department: '',
      description: '',
      team: ''
    }
  }

  // This event will insert or update the data in DB with the help of service to API call.
  onSubmit(form: NgForm) {
    if (form.value.userId == null) {
      form.value.userId = 0;
      this.userService.postUser(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.userService.getUserList();
          this.toastr.success('New Record Added Succcessfully', 'User Register');
        })
    }
    else {
      this.userService.putUser(form.value.userId, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.userService.getUserList();
          this.toastr.info('Record Updated Successfully!', 'User Register');
        });
    }
  }

  // This event will either insert or update the data into Store with the help of Action.
  onSubmitAddToStore(form: NgForm) {
    if (form.value.userId == null) {
      form.value.userId = 0;

      var userModel: UserModel = {
        userId: form.value.userId,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        displayName: form.value.displayName,
        email: form.value.email,
        description: form.value.description,
        department: form.value.department,
        team: form.value.team
      };

      this.store.dispatch(new UserActions.AddUser(userModel));
    }
    else {
      this.store.dispatch(new UserActions.UpdateUser(userModel));
    }
  }
}
