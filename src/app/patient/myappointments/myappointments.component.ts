import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IAppointment } from './model/myappointments.model';
import { MyappService } from './service/myapp.service';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.css']
})
export class MyappointmentsComponent implements OnInit {
  


  constructor(private myAppointmentService: MyappService, private router: Router) { }
  public dataSource = new MatTableDataSource<IAppointment>();
  public displayedColumns = ['Doctor', 'Room', 'Start', 'End', 'State', 'Action'];
  public appointments: IAppointment[] = [];
  
  public appointmentState : any = {
    "0" : "Canceled",
    "1" : "Finished",
    "2" : "Pending"
  };

  public cancelAppointment(id : number) : void
  {
    this.myAppointmentService.cancelAppointment(id).subscribe(res => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['patient/myAppointments']));
    });;
  }

  ngOnInit(): void { 
    
    this.myAppointmentService.getAllAppointments().subscribe(res => {
      this.appointments = res;
      this.dataSource.data = this.appointments.sort((a, b) => 0.5 - Math.random());
    })
  }

}
