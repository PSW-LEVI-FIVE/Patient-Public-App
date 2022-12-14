import { IAddress } from './IAddress';
import { BloodTypeEnum } from './BloodTypeEnum';
import { IAllergen } from './IAllergen';
export interface IUser {
    id?: number;
    name: string;
    surname: string;
    email : string;
    uid: string;
    phoneNumber:string;
    birthDate: Date;
    address:IAddress;
    bloodType:BloodTypeEnum;
    username:string;
    password:string;
    allergens: IAllergen[];
    doctorUid: string;
}