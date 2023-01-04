import { ITimeIntervalWithDoctor } from './../model/ITimeIntervalWithDoctor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ICreateAppointmentForPatient } from '../model/ICreateAppointment';
import { IDoctorWithSPeciality, ISpeciality } from '../model/IDoctorWithSpeciality';
import { ITimeInterval } from '../model/ITimeInterval';
import { AppointmentService } from '../service/appointment.service';
import { DoctorService } from '../service/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendation-schedule',
  templateUrl: './recommendation-schedule.component.html',
  styleUrls: ['./recommendation-schedule.component.css']
})
export class RecommendationScheduleComponent implements OnInit {
    
    tommorow:Date = new Date();
    choosenDateStart: Date = new Date();
    choosenDateEnd: Date = new Date();
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
    minDate: Date = new Date();
    maxDate: Date = new Date();
    dateChanged: number = 0;
    cantScheduleByTimeInterval: boolean = false;
    cantScheduleByRoom: boolean = false;
    isLoading: boolean = false;

    doctors: IDoctorWithSPeciality[] = [];

    possibleDoctors: IDoctorWithSPeciality[] = [];
    possibleSpecialities:ISpeciality[] = [];
    possibleIntervals: ITimeIntervalWithDoctor[] =[];
    priorities: string[] = ["Doctor", "Date range"];

    chosenPriority: string;
    chosenDoctor:IDoctorWithSPeciality = <IDoctorWithSPeciality>{};
    chosenSpeciality:ISpeciality = <ISpeciality>{};
    chosenTimeInterval:ITimeIntervalWithDoctor = <ITimeIntervalWithDoctor>{};
    constructor(private _formBuilder: FormBuilder, private doctorService: DoctorService,
        private appointmentService: AppointmentService, private router: Router,
        private readonly toastService: ToastrService) {
        this.minDate.setDate(new Date().getDate() + 1);
        this.tommorow.setDate(new Date().getDate() + 1);
        this.maxDate.setDate(new Date().getDate() + 365);
        this.chosenPriority = this.priorities[0];
        this.choosenDateStart = this.minDate;
        this.choosenDateEnd.setDate(new Date().getDate() + 7)
        this.doctorService.GetDoctorsForStepByStep().subscribe(res => {
        this.doctors = res;
        this.pushPossibleSpecialties();
        this.chosenSpeciality = this.possibleSpecialities[0];
        this.pushPossibleDoctors();
        },(error) => {console.log(error.Message)});
    }

    public pushPossibleDoctors() {
        this.possibleDoctors = [];
        for (var doctor of this.doctors) {
            if (doctor.speciality.id == this.chosenSpeciality.id)
                this.possibleDoctors.push(doctor);
        }
        this.chosenDoctor = this.possibleDoctors[0];
        this.getTimeIntervals();
    }

    private pushPossibleSpecialties() {
        for (var doctor of this.doctors) {
            if (this.possibleSpecialities.filter(speciality =>speciality.id == doctor.speciality.id).length > 0)
                continue;
            this.possibleSpecialities.push(doctor.speciality);
        }
    }
    getTimeIntervals() {
        if(this.choosenDateEnd == undefined)return;
        this.isLoading = true;
        this.appointmentService.GetTimeIntervalsRecommendation(this.chosenDoctor.uid,this.dateToUTC(this.choosenDateStart),this.dateToUTC(this.choosenDateEnd)).subscribe(res => {
            this.possibleIntervals = res;
            this.cantScheduleByRoom = false;
            if(this.possibleIntervals.length == 0)
            {
                var startRecommendDate = new Date();
                var endRecommendDate = new Date();
                startRecommendDate.setDate(this.choosenDateStart.getDate() - 5);
                endRecommendDate.setDate(this.choosenDateStart.getDate() + 5);
                if(this.chosenPriority == "Doctor")
                {
                    this.appointmentService.GetTimeIntervalsRecommendation(this.chosenDoctor.uid,this.dateToUTC(startRecommendDate),this.dateToUTC(endRecommendDate)).subscribe(res => {
                        this.possibleIntervals = res;
                        if(this.possibleIntervals.length == 0)
                        {
                            this.isLoading = false;
                            this.toastService.error("Oops we couldnt find any free times for you even with recommendations, try changing inputs.")
                            this.cantScheduleByTimeInterval = true;
                            return;
                        }
                        this.chosenTimeInterval = this.possibleIntervals[0];
                        this.toastService.info("Seems like we couldnt find any free times for your inputs! Here are some recommendations with priority.")
                        return;
                    },(error) => {console.log(error.Message)});
                }
                else
                {
                    this.appointmentService.GetTimeIntervalsRecommendationDatePriority(this.chosenSpeciality.name,this.dateToUTC(this.choosenDateStart),this.dateToUTC(this.choosenDateEnd)).subscribe(res => {
                        this.possibleIntervals = res;
                        if(this.possibleIntervals.length == 0)
                        {
                            this.isLoading = false;
                            this.toastService.error("Oops we couldnt find any free times for you even with recommendations, try changing inputs.")
                            this.cantScheduleByTimeInterval = true;
                            return;
                        }
                        this.chosenTimeInterval = this.possibleIntervals[0];
                        this.toastService.info("Seems like we couldnt find any free times for your inputs! Here are some recommendations with priority.")
                        return;
                    },(error) => {console.log(error.Message)});
                }
            }
            this.isLoading = false;
            this.cantScheduleByTimeInterval = false;
            this.chosenTimeInterval = this.possibleIntervals[0];
        },(error) => {console.log(error.Message)});
    }
    dateToUTC(date:Date) {
        var dateToSet = new Date();
        dateToSet.setDate(date.getDate());
        return new Date(dateToSet.toUTCString().substring(0,25));
    }
    dateIsChanged(): void {
        this.getTimeIntervals();
        this.dateChanged = 1;
    }
    resetSchedulingValidationByRoom(){
        this.cantScheduleByRoom = false;
    }
    getTimeString(date:Date): string {
        return date.toString().substring(11,16);
    }
    getDateString(date:Date): string {
        var year:number = new Date(date).getFullYear();
        var month:number = new Date(date).getMonth()+1;
        var day:number = new Date(date).getDate();

        return this.padTo2Digits(month) + "/" + this.padTo2Digits(day) + "/" + this.padTo2Digits(year);
    }
    padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }
    scheduleAppointment(){
        var appointment = <ICreateAppointmentForPatient>{};
        appointment.chosenTimeInterval = <ITimeInterval>{};
        appointment.chosenTimeInterval.start = this.chosenTimeInterval.start;
        appointment.chosenTimeInterval.end = this.chosenTimeInterval.end;
        appointment.doctorUid = this.chosenTimeInterval.doctorDto.uid;
        this.appointmentService.CreateAppointment(appointment).subscribe(res =>{
            this.toastService.success("Your appointment successfuly scheduled!")
            this.router.navigate(["/"])
        },(error) => {
            this.toastService.error("Oops there are no free rooms!")
            this.cantScheduleByRoom = true;
        });
    }
    ngOnInit(): void {
    }
}
