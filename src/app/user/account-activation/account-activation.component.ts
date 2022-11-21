import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {

    code: string;
    private sub: any;
    constructor(private route: ActivatedRoute,private router: Router) {
        this.code = "";
        this.sub = this.route.params.subscribe(params => {
            this.code = params['code'];
        });
     }

    ngOnInit(): void {
    }
    public print() {
        this.router.navigate(['login']);
        return console.log(this.code);
    }
}
