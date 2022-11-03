export interface IFeedback {
    id?: number;
    patient?:string;
    patientId: number;
    feedbackContent: string;
    allowPublishment : boolean;
    published: boolean;
    Anonimity: boolean;
}