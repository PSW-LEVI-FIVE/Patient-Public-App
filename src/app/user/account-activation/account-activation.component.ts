import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {

    Code: string;
    constructor(private route: ActivatedRoute,private router: Router,
                private userService: UserService) {
        this.Code = "";
        this.route.params.subscribe(params => {
            this.Code = params['code'];
        });
        this.userService.activate(this.Code).subscribe(res => {
        },error => this.router.navigate(['/user/activation/failed']));
     }

    ngOnInit(): void {
    }
    public print() {
        this.router.navigate(['login']);
        return console.log(this.Code);
    }
}
