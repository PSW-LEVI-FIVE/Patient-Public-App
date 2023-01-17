import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-account-activation',
    templateUrl: './account-activation.component.html',
    styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {

    Code: string;
    constructor(private route: ActivatedRoute, private router: Router,
        private userService: UserService,
        private readonly toastService: ToastrService) {
        this.Code = "";
        this.route.params.subscribe(params => {
            this.Code = params['code'];
        });
        this.userService.activate(this.Code).subscribe(res => {
            this.toastService.success("Successfully activated account! You can login now.")
            this.router.navigate(["/login"])
        }, error => {
            this.toastService.error("We couldnt activate your account! Check your email again or contact support");
            this.router.navigate(["/"])
        });
    }

    ngOnInit(): void {
    }
}
