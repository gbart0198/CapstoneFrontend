import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../user-authentication.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  info: string;
  password: string;

  constructor(private apiService: UserAuthenticationService) { }

  ngOnInit(): void {
  }

  login() {
    const data = {
      info: this.info,
      password: this.password
    }
    console.log(this.apiService.login(data))
    
  }



}
