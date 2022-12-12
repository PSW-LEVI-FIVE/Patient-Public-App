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
  public displayedColumns = ['Doctor', 'Room', 'Start', 'End', 'State'];
  public appointments: IAppointment[] = [];
  ngOnInit(): void { 
    this.myAppointmentService.getAllAppointments().subscribe(res => {
      this.appointments = res;
      this.appointments.forEach(element => {
        if(element.state == '2')element.state = "Pending";
        else if(element.state == '1')element.state = "Finished";
        else element.state = "Canceled";
      });
      this.dataSource.data = this.appointments.sort((a, b) => 0.5 - Math.random());
    })
  }

}
