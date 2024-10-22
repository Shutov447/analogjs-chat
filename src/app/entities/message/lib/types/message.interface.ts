export interface IMessage {
    id: number; // можно хранить список id сообщений у юзера в бд, которые он написал
    by: 'other' | 'me';
    email: string;
    text: string;
}
