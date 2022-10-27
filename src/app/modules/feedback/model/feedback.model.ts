export interface IFeedback {
    id?: number;
    patientId: number;
    feedbackContent: string;
    feedbackStatus?: number;
}