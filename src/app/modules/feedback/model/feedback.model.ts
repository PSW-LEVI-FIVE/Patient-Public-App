export interface IFeedback {
    id?: number;
    patientId: number;
    feedbackContent: string;
    publishment : boolean;
    feedbackStatus?: number;
}