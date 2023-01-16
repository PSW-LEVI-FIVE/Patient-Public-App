import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css', './landing-page-why-us.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor(private service: LoginService) { }
  navMoved: boolean = false;
  ngOnInit() {

  }
  @HostListener('window:scroll', ['$event'])
  onScroll(e: any) {
    if (window.pageYOffset > 0)
      this.navMoved = true
    else
      this.navMoved = false
    console.log(this.navMoved)

  }


}
