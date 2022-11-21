import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  onLogout()
  {
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);

  }
  isHidden()
  {
    if(localStorage.getItem('token') != null)
    {
      return true;
    }
    else return false;
  }
  isHiddenLogout()
  {
    if(localStorage.getItem('token') == null)
    {
      return true;
    }
    else return false;
  }

}
