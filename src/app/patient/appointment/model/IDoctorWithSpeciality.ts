  export interface ISpeciality{
    id: string;
    name:string;
  }

export interface IDoctorWithSPeciality{
    name: string;
    surname:string;
    uid:string;
    speciality: ISpeciality;
  }