import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, tap } from 'rxjs';
import { IReturnedUser, IUserAuthData } from '../../../../src/shared/types';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly destroyRef = inject(DestroyRef);
    private readonly router = inject(Router);
    private readonly _returnedUser$ = new BehaviorSubject<
        IReturnedUser | null | undefined
    >(undefined);

    readonly returnedUser$ = this._returnedUser$.asObservable();
    readonly errors = signal({
        registration: false,
        login: false,
    });

    constructor() {
        this.returnedUser$.subscribe((returnedUser) => {
            console.log('Returned user:', returnedUser);
        });
    }

    login(user?: IUserAuthData) {
        this.http
            .post<IReturnedUser | undefined>('/api/login', user)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((returnedUser) => {
                this._returnedUser$.next(returnedUser);

                console.log('in browser login', returnedUser);
                if (returnedUser) {
                    this.router.navigateByUrl('/');
                    this.errors.set({ login: false, registration: false });
                } else {
                    this.errors.set({ login: true, registration: false });
                }
            });
    }

    registration(user: IUserAuthData) {
        this.http
            .post<
                | {
                      statusCode: number;
                      message: string;
                      returnedUser?: IReturnedUser;
                  }
                | undefined
                | null
            >('/api/registration', user)
            .pipe(takeUntilDestroyed(this.destroyRef), tap())
            .subscribe((res) => {
                if (res?.returnedUser) {
                    this.errors.set({
                        registration: false,
                        login: false,
                    });
                    this.router.navigateByUrl('/');
                } else {
                    this.errors.set({
                        login: false,
                        registration: true,
                    });
                }

                this._returnedUser$.next(res?.returnedUser);
            });
    }
}
