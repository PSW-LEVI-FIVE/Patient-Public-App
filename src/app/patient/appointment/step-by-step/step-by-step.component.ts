import { AppointmentService } from './../service/appointment.service';
import { IDoctorWithSPeciality, ISpecialtyType, SpecialtyEnum } from './../model/IDoctorWithSpeciality';
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

    chosenSpecialty:ISpecialtyType = {SpecialtyType:SpecialtyEnum.ITERNAL_MEDICINE,SpecialtyTypeString: "Iternal medicine"};
    possibleSpecialtyTypes:ISpecialtyType[] = [];
    public SpecialtyTypes:ISpecialtyType[] = [
        {SpecialtyType:SpecialtyEnum.ALLERGY, SpecialtyTypeString: "Allergy"},
        {SpecialtyType:SpecialtyEnum.ANEESTHESIOLOGY,SpecialtyTypeString: "Anesthesiology"},
        {SpecialtyType:SpecialtyEnum.DERMATOLOGY,SpecialtyTypeString: "Dermatology"},
        {SpecialtyType:SpecialtyEnum.FAMILY_MEDICINE,SpecialtyTypeString: "Family medicine"},
        {SpecialtyType:SpecialtyEnum.NEUROLOGY,SpecialtyTypeString: "Neurology"},
        {SpecialtyType:SpecialtyEnum.PEDIATRICS,SpecialtyTypeString: "Pediatrics"},
        {SpecialtyType:SpecialtyEnum.UROLOGY,SpecialtyTypeString: "Urology"},
        {SpecialtyType:SpecialtyEnum.SURGERY,SpecialtyTypeString: "Surgery"},
        {SpecialtyType:SpecialtyEnum.PSYCHIATRY,SpecialtyTypeString: "Psychiatry"},
        {SpecialtyType:SpecialtyEnum.ITERNAL_MEDICINE,SpecialtyTypeString: "Iternal medicine"}];

    constructor(private _formBuilder: FormBuilder,private doctorService: DoctorService,private appointmentService: AppointmentService) {
        this.minDate.setDate(new Date().getDate() + 1);
        this.maxDate.setDate(new Date().getDate() + 365);
        this.chosenDate = this.minDate;
        this.doctorService.GetDoctorsForStepByStep().subscribe(res => {
            this.doctors = res;
            this.pushPossibleSpecialties();
            this.chosenSpecialty = this.SpecialtyTypes[9];
            this.pushPossibleDoctors();
        },(error) => {console.log(error.Message)});
     }
    
    public pushPossibleDoctors() {
        this.possibleDoctors = [];
        for (var doctor of this.doctors) {
            if (doctor.specialtyType == this.chosenSpecialty.SpecialtyType)
                this.possibleDoctors.push(doctor);
        }
        this.chosenDoctor = this.possibleDoctors[0];
        console.log(this.possibleDoctors);
    }

    private pushPossibleSpecialties() {
        var specialties: SpecialtyEnum[] = [];
        for (var doctor of this.doctors) {
            if (specialties.includes(doctor.specialtyType))
                continue;
            specialties.push(doctor.specialtyType);
            var Specialty: ISpecialtyType = this.SpecialtyTypes.find((specialty: ISpecialtyType) => specialty.SpecialtyType === doctor.specialtyType) || this.chosenSpecialty;
            this.possibleSpecialtyTypes.push(Specialty);
        }
    }
    getTimeIntervals() {
        this.appointmentService.GetTimeIntervals(this.chosenDoctor.uid,this.dateToUTC()).subscribe(res => {
            console.log(res);
        },(error) => {console.log(error.Message)});
    }
    dateToUTC() {
        return new Date(Date.UTC(this.chosenDate.getUTCFullYear(), this.chosenDate.getUTCMonth(),
            this.chosenDate.getUTCDate()+ this.dateChanged, this.chosenDate.getUTCHours(),
            this.chosenDate.getUTCMinutes(), this.chosenDate.getUTCSeconds()));
    }
    dateIsChanged(): void {
        this.dateChanged = 1;
    }

    ngOnInit(): void {
    }

}
