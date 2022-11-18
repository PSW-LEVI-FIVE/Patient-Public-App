import { BloodTypeEnum } from './BloodTypeEnum';
import { IAllergen } from './IAllergen';
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
    Allergens: IAllergen[];
}