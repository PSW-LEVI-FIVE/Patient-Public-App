import { IPatientsDoctor } from "src/app/user/model/IPatientsDoctor";

export interface ITimeIntervalWithDoctor{
    start: Date;
    end: Date;
    doctorDto:IPatientsDoctor
}