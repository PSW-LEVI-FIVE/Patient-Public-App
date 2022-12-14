export interface IAppointment {
    id: number;
    doctorId: number;
    doctor: string;
    room: string;
    roomId : number;
    startAt: string;
    endAt: string;
    state: number;
}