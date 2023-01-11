import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';
import { IExam } from '../myappointments/model/exam.model';
import { IAppointment } from '../myappointments/model/myappointments.model';
import { MyappService } from '../myappointments/service/myapp.service';

@Component({
  selector: 'app-finished-appointments',
  templateUrl: './finished-appointments.component.html',
  styleUrls: ['./finished-appointments.component.css']
})
export class FinishedAppointmentsComponent implements OnInit {

  constructor(private myAppointmentService: MyappService, private router: Router, private readonly toastService: ToastrService) { }
  public dataSource = new MatTableDataSource<IAppointment>();
  public displayedColumns = ['Doctor', 'Room', 'Start', 'End', 'State','Pdf'];
  public appointmentsList: IAppointment[] = [];
  public exam! : IExam;
  public appointmentState : any = {
    "0" : "Canceled",
    "1" : "Finished",
    "2" : "Pending"
  };
  public isLoading: boolean = false;

  public showPdf(appointmentId : number) : void
  {
    console.log(appointmentId)
    this.myAppointmentService.showPdf(appointmentId)
    .pipe(catchError(res => {
      this.toastService.error("You can't show pdf");
      return EMPTY
    }))
    .subscribe(res => {
      this.exam = res;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['patient/finished']));
      window.open(this.exam.url, '_blank');
    }); 
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.myAppointmentService.getAllFinishedAppointments().subscribe(res => {
      this.appointmentsList = res;
      this.isLoading = false;
      this.dataSource.data = this.appointmentsList;
    })
  }


}
