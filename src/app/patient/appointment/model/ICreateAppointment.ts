import { ITimeInterval } from "./ITimeInterval";

export interface ICreateAppointmentForPatient{
    doctorUid:string;
    chosenTimeInterval: ITimeInterval;
  }