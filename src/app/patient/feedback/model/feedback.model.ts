export interface IFeedback {
    id?: number;
    patient?:string;
    patientId: number;
    feedbackContent: string;
    feedbackStatus: IFeedbackStatus;
}
export interface IFeedbackStatus {
    allowPublishment : boolean;
    published: boolean;
    anonimity: boolean;
}