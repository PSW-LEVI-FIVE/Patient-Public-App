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
  public caughtPassword : string = "";

  ngOnInit(): void {
  }

  public makeLogin() {
    this.login.Username = this.caughtEmail;
    this.login.Password = this.caughtPassword;
    console.log(this.login.Username + " " + this.login.Password);
    this.loginService.makeLogin(this.login).subscribe(res => {
      if(res != null)
      {
      var role = res.split(" ")[1];
      localStorage.setItem('token',res.split(" ")[0]);
      localStorage.setItem('role',role);
      if(role != "Patient")
      {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        this.caughtEmail = ""
        this.caughtPassword = ""
        this.router.navigate(['/login']);
        
      }
      else
        this.router.navigate(['/']);
      }
      else
      {
        alert("Pogresni username ili password")
        this.caughtEmail = ""
        this.caughtPassword = ""
        this.router.navigate(['/']);
      }
    });
  }


}
