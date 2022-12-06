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
    chosenDate: Date = new Date();
    dateChanged: number = 0;

    doctors: IDoctorWithSPeciality[] = [];
    possibleDoctors: IDoctorWithSPeciality[] = [];
    chosenDoctor:IDoctorWithSPeciality = <IDoctorWithSPeciality>{};

    chosenSpeciality:ISpeciality = <ISpeciality>{};
    possibleSpecialities:ISpeciality[] = [];

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
    }

    private pushPossibleSpecialties() {
        for (var doctor of this.doctors) {
            if (this.possibleSpecialities.filter(speciality =>speciality.id == doctor.speciality.id).length > 0)
                continue;
            this.possibleSpecialities.push(doctor.speciality);
        }
    }
    getTimeIntervals() {
        this.appointmentService.GetTimeIntervals(this.chosenDoctor.uid,this.dateToUTC()).subscribe(res => {
            console.log(res);
        },(error) => {console.log(error.Message)});
    }
    dateToUTC() {
        var dateToSet = new Date();
        dateToSet.setDate(this.chosenDate.getDate());
        return new Date(dateToSet.toUTCString().substring(0,25));
    }
    dateIsChanged(): void {
        this.dateChanged = 1;
    }

    ngOnInit(): void {
    }

}
