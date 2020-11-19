import { Component } from '@angular/core';
import { UserAuthenticationService } from './user-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CapstoneFrontend';
  loggedIn: boolean = false;
  privileged: boolean = false;
  constructor(private apiService: UserAuthenticationService) {}
  ngOnInit() {
    this.loggedIn = this.apiService.isLoggedIn();
    this.privileged = localStorage.getItem('privilege')=='admin';
  }

  reloadComponent() {
    this.loggedIn = this.apiService.isLoggedIn();
    this.privileged = localStorage.getItem('privilege')=='admin';
  }
}
