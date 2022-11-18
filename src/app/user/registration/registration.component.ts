import { IAllergen } from './../model/IAllergen';
import { AllergenService } from './../services/allergen.service';
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

  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-z]+$")]); 
  surname = new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-z]+$")]); 
  uid = new FormControl('', [Validators.required, Validators.pattern("^[0-9]{8}$")]); 
  address = new FormControl('', [Validators.required, Validators.pattern("^[A-Z][A-Za-z0-9( )]+$")]); 
  phone = new FormControl('', [Validators.required, Validators.pattern("^[+]*[0-9-]+$")]);
  username = new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9_-]+$")]);
  password = new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]{5}[A-Za-z0-9]+$")]);
  confirmPassword = new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]{5}[A-Za-z0-9]+$")]);
  allergens = new FormControl('');
  currentYear:number = new Date().getFullYear();
  minDate: Date = new Date(this.currentYear - 150, 0, 1);
  maxDate: Date = new Date();
  
  public RegisterDisabled : boolean = true;
  public User : IUser = {} as IUser;
  public ConfirmPassword: string = "";
  AllergensList: IAllergen[];
  public BloodTypes:IBloodType[] = [
  {BloodType:BloodTypeEnum.A_POSITIVE, BloodTypeString: "A+"},
  {BloodType:BloodTypeEnum.A_NEGATIVE,BloodTypeString: "A-"},
  {BloodType:BloodTypeEnum.B_POSITIVE,BloodTypeString: "B+"},
  {BloodType:BloodTypeEnum.B_NEGATIVE,BloodTypeString: "B-"},
  {BloodType:BloodTypeEnum.AB_POSITIVE,BloodTypeString: "AB+"},
  {BloodType:BloodTypeEnum.AB_NEGATIVE,BloodTypeString: "AB-"},
  {BloodType:BloodTypeEnum.ZERO_POSITIVE,BloodTypeString: "O+"},
  {BloodType:BloodTypeEnum.ZERO_NEGATIVE,BloodTypeString: "O-"}];

  constructor(private userService: UserService,private allergenService:AllergenService, private router: Router) {
    this.User.id = 0;
    this.User.Name = "";
    this.User.Surname = "";
    this.User.Address = "";
    this.User.BloodType = 0;
    this.User.Email = "";
    this.User.Uid = "";
    this.User.PhoneNumber = "";
    this.User.Username = "";
    this.User.Password = "";
    this.User.Allergens = [];
    this.AllergensList = [];
    this.allergenService.getAllergens().subscribe(res => {
      this.AllergensList = res;
    },(error) => {alert("Status: "+ error.status +", Message: " + error.message)}
    );
  }

  ngOnInit(): void {
  }
  public allergenString(allergen:any) {
    return allergen.name;
  }
  public register() {
    if(this.ConfirmPassword !== this.User.Password){
      alert("Password and confirm password dont match!");
      return;
    }
    this.userService.register(this.User).subscribe(res => {
      alert("You registered successfully!");
      this.router.navigate(['/']);
    },(error) => {alert("Status: "+ error.status +", Message: " + error.message)}
    );
  }
  ValidateForm(){
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.) +([a-zA-Z0-9]{2,4})+$/;
    if(!this.User.Name.match("^[A-Z][a-z]+$") || !this.User.Surname.match("^[A-Z][a-z]+$")
    || !this.User.Address.match("^[A-Z][A-Za-z0-9( )]+$") || emailRegex.test(this.User.Email)
    || !this.User.Uid.match("^[0-9]{8}$") || !this.User.PhoneNumber.match("^[+]*[0-9-]+$")
    || !this.User.Username.match("^[A-Za-z0-9]+$") || !this.User.Password.match("^[A-Za-z0-9]{5}[A-Za-z0-9]+$")){
      this.RegisterDisabled = true;
      return
    }
    this.RegisterDisabled = false;
  }
}
