import { IAddress } from './../model/IAddress';
import { DoctorService } from '../service/doctor.service';
import { IAllergen } from './../model/IAllergen';
import { AllergenService } from '../service/allergen.service';
import { BloodTypeEnum } from '../model/BloodTypeEnum';
import { UserService } from '../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../model/IUser';
import {IBloodType} from './../model/IBloodType';
import {FormControl, Validators} from '@angular/forms';
import { IPatientsDoctor } from '../model/IPatientsDoctor';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
    street = new FormControl('', [Validators.required, Validators.pattern("^[A-Z][A-Za-z0-9( )]+$")]);
    streetNumber = new FormControl('', [Validators.required, Validators.pattern("^[1-9]+[a-b]{0,1}$")]);
    country = new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-z]+$")]);
    city = new FormControl('', [Validators.required, Validators.pattern("^[A-Z][A-Za-z( )]+$")]);
    phone = new FormControl('', [Validators.required, Validators.pattern("^[+]*[0-9-]+$")]);
    username = new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9_-]+$")]);
    password = new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]{5}[A-Za-z0-9]+$")]);
    confirmPassword = new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]{5}[A-Za-z0-9]+$")]);
    birthDate = new FormControl(new Date(), [Validators.required])
    allergens = new FormControl('');
    currentYear:number = new Date().getFullYear();
    minDate: Date = new Date(this.currentYear - 150, 0, 1);
    maxDate: Date = new Date();

    public RegisterDisabled : boolean = true;
    public user : IUser = {} as IUser;
    public ConfirmPassword: string = "";
    Allergens: IAllergen[];
    Doctors: IPatientsDoctor[];
    public BloodTypes:IBloodType[] = [
    {BloodType:BloodTypeEnum.A_POSITIVE, BloodTypeString: "A+"},
    {BloodType:BloodTypeEnum.A_NEGATIVE,BloodTypeString: "A-"},
    {BloodType:BloodTypeEnum.B_POSITIVE,BloodTypeString: "B+"},
    {BloodType:BloodTypeEnum.B_NEGATIVE,BloodTypeString: "B-"},
    {BloodType:BloodTypeEnum.AB_POSITIVE,BloodTypeString: "AB+"},
    {BloodType:BloodTypeEnum.AB_NEGATIVE,BloodTypeString: "AB-"},
    {BloodType:BloodTypeEnum.ZERO_POSITIVE,BloodTypeString: "O+"},
    {BloodType:BloodTypeEnum.ZERO_NEGATIVE,BloodTypeString: "O-"}];

    constructor(private userService: UserService,private allergenService:AllergenService,
        private doctorService:DoctorService,private router: Router,
        private readonly toastService: ToastrService) 
    {
        this.user.id = 0;
        this.user.name = "";
        this.user.surname = "";
        this.user.address = <IAddress>{};
        this.user.address.city = "";
        this.user.address.country = "";
        this.user.address.street = "";
        this.user.address.streetNumber = "";
        this.user.bloodType = 0;
        this.user.email = "";
        this.user.uid = "";
        this.user.phoneNumber = "";
        this.user.username = "";
        this.user.password = "";
        this.user.allergens = [];
        this.Allergens = [];
        this.Doctors = [];
        this.allergenService.getAllergens().subscribe(res => {
            this.Allergens = res;
        },(error) => {console.log(error.Message)});

        this.doctorService.getDoctors().subscribe(res => {
            this.Doctors = res;
            this.user.doctorUid = this.Doctors[0].uid;
        },(error) => {console.log(error.Message)});
    }

    ngOnInit(): void 
    {
        this.password.setErrors(null)
    }

    GetAllergenString(allergen:any) 
    {
        return allergen.name;
    }

    GetDoctorString(doctor:any)
    {
        return doctor.name + " " + doctor.surname + " " + doctor.uid;
    }
    ValidateUniqueness()
    {        
        this.userService.validateEmail(this.user.email).subscribe(res => {
            this.email.setErrors(null)
            this.email.updateValueAndValidity();
            },(error) => {
                this.toastService.error("Email is already taken!")
                this.email.setErrors({EmailUnique:true})
                this.RegisterDisabled = true
            }
        );
        this.userService.validateUid(this.user.uid).subscribe(res => {
            this.uid.setErrors(null)
            this.uid.updateValueAndValidity();
            },(error) => {
                this.toastService.error("Uid is already taken!")
                this.uid.setErrors({UidUnique:true})
                this.RegisterDisabled = true
            }
        );
        this.userService.validateUsername(this.user.username).subscribe(res => {
            this.username.setErrors(null)
            this.username.updateValueAndValidity();
            },(error) => {
                this.toastService.error("Username is already taken!")
                this.username.setErrors({UsernameUnique:true})
                this.RegisterDisabled = true
            }
        );
    }
    Register()
    {
        this.ValidateUniqueness()
        if(this.email.hasError('EmailUnique') || this.uid.hasError('UidUnique') || this.username.hasError('UsernameUnique'))
        {
            return;
        }
        this.userService.register(this.user).subscribe(res => {
        this.router.navigate(['/']);
        this.toastService.success("You have successfuly registered! Check email for activation.");
        },(error: HttpErrorResponse) => {
            this.toastService.error(error.error.Message)
        }
        );
    }
    ValidateForm()
    {
        console.log(this.user)
        if(this.ConfirmPassword !== this.user.password)
        {
            if(!this.password.hasError('pattern') && !this.password.hasError('required')){
                this.password.setErrors({PasswordMatch:true})
                this.RegisterDisabled = true
            }
            if(!this.confirmPassword.hasError('pattern') && !this.confirmPassword.hasError('required')){
                this.confirmPassword.setErrors({PasswordMatch:true})
                this.RegisterDisabled = true
            }
            return;
        }
        this.password.setErrors(null)
        this.password.updateValueAndValidity();
        this.confirmPassword.setErrors(null)
        this.confirmPassword.updateValueAndValidity();
        
        const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.) +([a-zA-Z0-9]{2,4})+$/;
        if(!this.user.name.match("^[A-Z][a-z]+$") || !this.user.surname.match("^[A-Z][a-z]+$")
        || !this.user.address.street.match("^[A-Z][A-Za-z0-9( )]+$") || emailRegex.test(this.user.email)
        || !this.user.address.streetNumber.match("^[1-9]+[a-b]{0,1}$")
        || !this.user.address.city.match("^[A-Z][A-Za-z( )]+$")
        || !this.user.address.country.match("^[A-Z][a-z]+$")
        || !this.user.uid.match("^[0-9]{8}$") || !this.user.phoneNumber.match("^[+]*[0-9-]+$")
        || !this.user.username.match("^[A-Za-z0-9]+$") || !this.user.password.match("^[A-Za-z0-9]{5}[A-Za-z0-9]+$")
        || this.minDate > this.user.birthDate || this.user.birthDate > this.maxDate){
            this.RegisterDisabled = true
            return;
        }
        this.RegisterDisabled = false;
    }
}
