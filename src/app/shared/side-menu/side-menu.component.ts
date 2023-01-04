import { DataService } from './../login/service/data.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService } from '../login/service/menu.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginService } from '../login/service/login.service';
import { Role } from '../login/model/authenticated.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  animations: [
    trigger('menuLoading', [
      transition(':enter', [
        query('.item', [
          style({
            opacity: 0,
            transform: 'translateX(-100px)'
          }),
          stagger(100, [
            animate('600ms 0.2s ease-in-out',
              style({
                opacity: 1,
                transform: 'translateX(0px)'
              }))
          ])
        ])
      ])
    ])
  ]
})
export class SideMenuComponent implements OnInit {

  private burgerState: boolean = true;
  constructor(
    private readonly menuService: MenuService,
    private readonly router: Router,
    private readonly dataService: DataService,
    private readonly loginService: LoginService
  ) { }

  ngOnInit(): void {
  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.updateData();
    this.router.navigate(["/"]);
  }

    updateData() {
        this.loginService.getUserProfile().subscribe(res => {
            this.dataService.updateData(res);
        },(error) => {
            this.dataService.updateData({ name: "", surname: '', role: Role.PATIENT, username: ''})
        })
    }

  toggleBurger() {
    this.burgerState = !this.burgerState
    this.menuService.setBurgerState(this.burgerState)
  }

  isHidden() {
    if(localStorage.getItem('token') != null)
        return true;
    return false;
  }

  isHiddenLogout() {
    if(localStorage.getItem('token') == null)
        return true;
    return false;
  }
}
