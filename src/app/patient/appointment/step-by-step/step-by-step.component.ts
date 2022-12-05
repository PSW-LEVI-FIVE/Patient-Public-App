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
    choosenDate: Date = new Date();

    doctors: IDoctorWithSPeciality[] = [];
    possibleDoctors: IDoctorWithSPeciality[] = [];
    choosenDoctor:IDoctorWithSPeciality = <IDoctorWithSPeciality>{};

    choosenSpecialty:ISpecialtyType = {SpecialtyType:SpecialtyEnum.ITERNAL_MEDICINE,SpecialtyTypeString: "Iternal medicine"};
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

    constructor(private _formBuilder: FormBuilder,private doctorService: DoctorService) {
        this.minDate.setDate(new Date().getDate() + 1);
        this.maxDate.setDate(new Date().getDate() + 365);
        this.choosenDate = this.minDate;
        this.doctorService.getDoctorsForStepByStep().subscribe(res => {
            this.doctors = res;
            this.PushPossibleSpecialties();
            this.choosenSpecialty = this.SpecialtyTypes[9];
            this.PushPossibleDoctors();
        },(error) => {console.log(error.Message)});
     }
    
    public PushPossibleDoctors() {
        this.possibleDoctors = [];
        for (var doctor of this.doctors) {
            if (doctor.specialtyType == this.choosenSpecialty.SpecialtyType)
                this.possibleDoctors.push(doctor);
        }
        this.choosenDoctor = this.possibleDoctors[0];
        console.log(this.possibleDoctors);
    }

    private PushPossibleSpecialties() {
        var specialties: SpecialtyEnum[] = [];
        for (var doctor of this.doctors) {
            if (specialties.includes(doctor.specialtyType))
                continue;
            specialties.push(doctor.specialtyType);
            var Specialty: ISpecialtyType = this.SpecialtyTypes.find((specialty: ISpecialtyType) => specialty.SpecialtyType === doctor.specialtyType) || this.choosenSpecialty;
            this.possibleSpecialtyTypes.push(Specialty);
        }
    }

    ngOnInit(): void {
    }

}
