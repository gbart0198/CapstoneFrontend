import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from "../user-authentication.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  info: string;
  priviliged = false;


  constructor(private apiService: UserAuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('privilege')) {
      this.priviliged = localStorage.getItem('privilege')=='admin';
    }
    if (!this.priviliged) {
      this.router.navigateByUrl("/");
    }
  }

  confirmDelete() {
    this.apiService.delete(this.info).subscribe( res=> {
      console.log("res");
    }, err => {
      console.log(err);
    })
  }

}
