import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgForm } from '@angular/forms'
import { UserService } from '../../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../../models/user-model/user-model'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private userService: UserService, private toastr: ToastrService) { }

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
}
