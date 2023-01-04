import { Component, OnInit } from '@angular/core';
import { Authenticated, Role } from '../login/model/authenticated.model';
import { DataService } from '../login/service/data.service';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    profile: Authenticated = { name: "", surname: '', role: Role.PATIENT, username: '' }
    burgerState: boolean = true
    constructor(private readonly loginService: LoginService,private dataService: DataService) { 
        this.dataService.profile$.subscribe(profile => {
            console.log(profile)
            this.profile = profile;
          });
    }

    ngOnInit(): void {
        this.loginService.getUserProfile().subscribe(res => {
            this.profile = res
        })
    }
}
