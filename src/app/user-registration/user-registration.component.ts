import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../user-authentication.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  username: string;
  email: string;
  password: string;


  constructor(private apiService: UserAuthenticationService) { }

  ngOnInit(): void {
  }

  register() {
    const data = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    this.apiService.register(data).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

}
