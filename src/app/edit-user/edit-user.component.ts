import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../user-authentication.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  username: string;
  password: string;
  email: string;

  constructor(private apiService: UserAuthenticationService) { }

  ngOnInit(): void {
  }

  submitEdit() {
    const data = {
      username: this.username,
      password: this.password,
      email: this.email
    };
    let info = '';
    if (this.username) {
      info = this.username;
    } else if (this.email) {
      info = this.email;
    }

    this.apiService.update(info, data).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
    });

  }


}
