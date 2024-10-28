export interface IMessage {
    id: number;
    by: 'other' | 'me';
    email: string;
    text: string;
}
