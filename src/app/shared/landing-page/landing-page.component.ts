import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  HospitalImage : string = "../../../../assets/HospitalImage.png";
  HospitalSign : string = "../../../../assets/hospitalSign.png";
  constructor(private service: LoginService) { }
  ngOnInit() {
  }
  

}
