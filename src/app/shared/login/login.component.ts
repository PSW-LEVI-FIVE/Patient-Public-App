import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from './model/login.model';
import { LoginService } from './service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  public login : ILogin = {} as ILogin
  public caughtEmail : string = "";
  public password : string = "";

  ngOnInit(): void {
  }

  public makeLogin() {
    this.login.email = this.caughtEmail;
    //this.login.password = this.password;
    console.log(this.login.email);
    this.loginService.makeLogin(this.login).subscribe(res => {
      this.router.navigate(['/']);
    });
  }


}
