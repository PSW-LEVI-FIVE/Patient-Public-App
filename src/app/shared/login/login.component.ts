import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './model/authenticated.model';
import { ILogin } from './model/login.model';
import { LoginService } from './service/login.service';
import { catchError, EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './service/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly loginService: LoginService,
              private readonly router: Router,
              private readonly toastService: ToastrService,
              private readonly dataService: DataService,) { }

  public login : ILogin = {} as ILogin
  public caughtEmail: string = "";
  public caughtPassword: string = "";
  public errorMessage:string = "";
  public validForm = true;

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.loginService.getUserProfile().subscribe(res => {
        if (res == null || !res) return
        if (res.role == Role.DOCTOR) {
          this.router.navigate(["/doctor/appointments"])
        } else if (res.role == Role.MANAGER) {
          this.router.navigate(["/manager"])
        }
      });
    }
  }

  public logIn() {
    this.login.Username = this.caughtEmail;
    this.login.Password = this.caughtPassword;
    this.loginService.login(this.login)
      .pipe(catchError(res => {
        this.toastService.error("Username or password not valid!")
        this.errorMessage = "Username or password not valid!"
        this.validForm = false;
        return EMPTY
      }))
      .subscribe(res => {
        let role = this.enumToRoleString(res.role)
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('role', role);
        this.toastService.success("Successfully logged in!")
        this.updateData();
        this.router.navigate(["/"])
      });
  }

  updateData() {
    this.loginService.getUserProfile().subscribe(res => {
        this.dataService.updateData(res);
    },(error) => {
        this.dataService.updateData({ name: "", surname: '', role: Role.PATIENT, username: ''})
    })
}

  public enumToRoleString(role: Role) {
    if (role == Role.PATIENT) return "Patient";
    return "";
  }
}
