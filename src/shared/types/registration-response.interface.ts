import { IReturnedUser } from './returned-user.interface';

export interface IRegistrationResponse {
    statusCode: number;
    message?: string;
    returnedUser?: IReturnedUser;
}
