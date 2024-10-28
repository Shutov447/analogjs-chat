import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { IReturnedUser, IUserAuthData } from '../../../../src/shared/types';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly _returnedUser$ = new BehaviorSubject<
        IReturnedUser | null | undefined
    >(undefined);

    readonly returnedUser$ = this._returnedUser$.asObservable();
    readonly errors = signal({
        registration: false,
        login: false,
    });

    login(user?: IUserAuthData) {
        return this.http
            .post<IReturnedUser | undefined>('/api/login', user)
            .pipe(
                tap((returnedUser) => {
                    this._returnedUser$.next(returnedUser);
                    returnedUser
                        ? this.errors.set({ login: false, registration: false })
                        : this.errors.set({ login: true, registration: false });
                })
            );
    }

    registration(user: IUserAuthData) {
        return this.http
            .post<
                | {
                      statusCode: number;
                      message: string;
                      returnedUser?: IReturnedUser;
                  }
                | undefined
                | null
            >('/api/registration', user)
            .pipe(
                tap((res) => {
                    this._returnedUser$.next(res?.returnedUser);
                    res?.returnedUser
                        ? this.errors.set({ login: false, registration: false })
                        : this.errors.set({ login: false, registration: true });
                })
            );
    }
}
