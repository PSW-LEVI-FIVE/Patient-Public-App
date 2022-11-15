import { BloodTypeEnum } from '../model/BloodTypeEnum';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../model/IUser';
import {IBloodType} from './../model/IBloodType';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-z]+$")]); 
  surname = new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-z]+$")]); 
  uid = new FormControl('', [Validators.required, Validators.pattern("^[0-9]{8}$")]); 
  address = new FormControl('', [Validators.required, Validators.pattern("^[A-Z][A-Za-z0-9( )]+$")]); 
  phone = new FormControl('', [Validators.required, Validators.pattern("^[+]*[0-9-]+$")]);
  
  public registerDisabled : boolean = true;
  public user : IUser = {} as IUser
  public BloodTypes:IBloodType[] = [
  {BloodType:BloodTypeEnum.A_POSITIVE, BloodTypeString: "A+"},
  {BloodType:BloodTypeEnum.A_NEGATIVE,BloodTypeString: "A-"},
  {BloodType:BloodTypeEnum.B_POSITIVE,BloodTypeString: "B+"},
  {BloodType:BloodTypeEnum.B_NEGATIVE,BloodTypeString: "B-"},
  {BloodType:BloodTypeEnum.AB_POSITIVE,BloodTypeString: "AB+"},
  {BloodType:BloodTypeEnum.AB_NEGATIVE,BloodTypeString: "AB-"},
  {BloodType:BloodTypeEnum.ZERO_POSITIVE,BloodTypeString: "O+"},
  {BloodType:BloodTypeEnum.ZERO_NEGATIVE,BloodTypeString: "O-"}];

  constructor(private userService: UserService, private router: Router) {
    this.user.id = 0;
    this.user.Name = "";
    this.user.Surname = "";
    this.user.Address = "";
    this.user.BloodType = 0;
    this.user.Email = "";
    this.user.Uid = "";
    this.user.PhoneNumber = "";
   }

  ngOnInit(): void {
  }
  public register() {
    this.userService.register(this.user).subscribe(res => {
      alert("You registered successfully!");
      this.router.navigate(['/']);
    },(error) => {alert("Status: "+ error.status +", Message: " + error.message)}
    );
  }
  ValidateForm(){
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.) +([a-zA-Z0-9]{2,4})+$/;
    if(!this.user.Name.match("^[A-Z][a-z]+$") || !this.user.Surname.match("^[A-Z][a-z]+$")
    || !this.user.Address.match("^[A-Z][A-Za-z0-9( )]+$") || emailRegex.test(this.user.Email)
    || !this.user.Uid.match("^[0-9]{8}$") || !this.user.PhoneNumber.match("^[+]*[0-9-]+$")){
      this.registerDisabled = true;
      return
    }
    this.registerDisabled = false;
  }
}
