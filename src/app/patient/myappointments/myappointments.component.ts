import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IAppointment } from './model/myappointments.model';
import { MyappService } from './service/myapp.service';
import { catchError, EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.css']
})
export class MyappointmentsComponent implements OnInit {
  


  constructor(private myAppointmentService: MyappService, private router: Router, private readonly toastService: ToastrService) { }
  public dataSource = new MatTableDataSource<IAppointment>();
  public displayedColumns = ['Doctor', 'Room', 'Start', 'End', 'State', 'Action'];
  public appointmentsList: IAppointment[] = [];
  public appointmentState : any = {
    "0" : "Canceled",
    "1" : "Finished",
    "2" : "Pending"
  };

  public cancelAppointment(id : number) : void
  {
    this.myAppointmentService.cancelAppointment(id)
    .pipe(catchError(res => {
      this.toastService.error("You can't cancel appointment 24h before start");
      return EMPTY
    }))
    .subscribe(res => {
      
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['patient/myAppointments']));
    });
    
  }

  ngOnInit(): void { 
    
    this.myAppointmentService.getAllAppointments().subscribe(res => {
      this.appointmentsList = res;
      this.dataSource.data = this.appointmentsList;
    })
  }

}
