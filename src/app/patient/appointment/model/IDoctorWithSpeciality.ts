export enum SpecialtyEnum{
    ALLERGY,
    ANEESTHESIOLOGY,
    DERMATOLOGY,
    FAMILY_MEDICINE,
    NEUROLOGY,
    PEDIATRICS,
    UROLOGY,
    SURGERY,
    PSYCHIATRY,
    ITERNAL_MEDICINE
  }

  export interface ISpecialtyType{
    SpecialtyType: SpecialtyEnum;
    SpecialtyTypeString:string;
  }

export interface IDoctorWithSPeciality{
    name: string;
    surname:string;
    uid:string;
    specialtyType: SpecialtyEnum;
  }