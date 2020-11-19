import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../user-authentication.service';

@Component({
  selector: 'app-user-signout',
  templateUrl: './user-signout.component.html',
  styleUrls: ['./user-signout.component.css']
})
export class UserSignoutComponent implements OnInit {

  constructor(private apiService: UserAuthenticationService) { }


  ngOnInit(): void {
  }

  confirmSignout() {
    if (this.apiService.isLoggedIn()) {
      this.apiService.logout();
      console.log("Logout successful");
    }

  }
}

