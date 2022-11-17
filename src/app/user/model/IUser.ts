import { BloodTypeEnum } from './BloodTypeEnum';
export interface IUser {
    id?: number;
    Name: string;
    Surname: string;
    Email : string;
    Uid: string;
    PhoneNumber:string;
    BirthDate: Date;
    Address:String;
    BloodType:BloodTypeEnum;
    Username:string;
    Password:string;
}