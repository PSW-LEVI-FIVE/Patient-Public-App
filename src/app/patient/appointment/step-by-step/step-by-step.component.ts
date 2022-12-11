import { ICreateAppointmentForPatient } from './../model/ICreateAppointment';
import { ITimeInterval } from './../model/ITimeInterval';
import { AppointmentService } from './../service/appointment.service';
import { IDoctorWithSPeciality, ISpeciality } from './../model/IDoctorWithSpeciality';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../service/doctor.service';

@Component({
  selector: 'app-step-by-step',
  templateUrl: './step-by-step.component.html',
  styleUrls: ['./step-by-step.component.css']
})
export class StepByStepComponent implements OnInit {

    firstFormGroup: FormGroup = this._formBuilder.group(
        {appointmentDate: new FormControl(new Date(), [Validators.required])}
        );
    secondFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
    minDate: Date = new Date();
    maxDate: Date = new Date();
    dateChanged: number = 0;
    cantScheduleByTimeInterval: boolean = false;
    cantScheduleByRoom: boolean = false;

    doctors: IDoctorWithSPeciality[] = [];

    possibleDoctors: IDoctorWithSPeciality[] = [];
    possibleSpecialities:ISpeciality[] = [];
    possibleIntervals: ITimeInterval[] =[];

    chosenDoctor:IDoctorWithSPeciality = <IDoctorWithSPeciality>{};
    chosenSpeciality:ISpeciality = <ISpeciality>{};
    chosenDate: Date = new Date();
    chosenTimeInterval:ITimeInterval = <ITimeInterval>{};

    constructor(private _formBuilder: FormBuilder,private doctorService: DoctorService,private appointmentService: AppointmentService) {
        this.minDate.setDate(new Date().getDate() + 1);
        this.maxDate.setDate(new Date().getDate() + 365);
        this.chosenDate = this.minDate;
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
        this.appointmentService.GetTimeIntervalsStepByStep(this.chosenDoctor.uid,this.dateToUTC()).subscribe(res => {
            this.possibleIntervals = res;
            this.cantScheduleByRoom = false;
            if(this.possibleIntervals.length == 0)
            {
                this.cantScheduleByTimeInterval = true;
                return;
            }
            this.cantScheduleByTimeInterval = false;
            this.chosenTimeInterval = this.possibleIntervals[0];
        },(error) => {console.log(error.Message)});
    }
    dateToUTC() {
        var dateToSet = new Date();
        dateToSet.setDate(this.chosenDate.getDate());
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
    scheduleAppointment(){
        var appointment = <ICreateAppointmentForPatient>{};
        appointment.chosenTimeInterval = this.chosenTimeInterval;
        appointment.doctorUid = this.chosenDoctor.uid;
        this.appointmentService.CreateAppointment(appointment).subscribe(res =>{
        },(error) => {
            this.cantScheduleByRoom = true;
            console.log(error.Message)
        });
    }

    ngOnInit(): void {
    }

}
