export interface IFeedback {
    id?: number;
    patientId: number;
    feedbackContent: string;
    allowPublishment : boolean;
    published: boolean;
    Anonimity: boolean;
}