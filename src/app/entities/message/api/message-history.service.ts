import { HttpClient } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {
    DestroyRef,
    inject,
    Injectable,
    Injector,
    OnDestroy,
    PLATFORM_ID,
    signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@entities/auth';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, first } from 'rxjs';
import { IReturnedMessage } from '../../../../../src/shared/types';

@Injectable({
    providedIn: 'root',
})
export class MessageHistoryService implements OnDestroy {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly http = inject(HttpClient);
    private readonly authService = inject(AuthService);
    private readonly injector = inject(Injector);
    private readonly destroyRef = inject(DestroyRef);
    private readonly _history$ = new BehaviorSubject<IReturnedMessage[]>([]);

    private _ws$!: WebSocketSubject<unknown>;

    readonly history$ = this._history$.asObservable();
    readonly isError = signal({ load: false, addMessage: false });

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this._ws$ = webSocket('ws://localhost:6969');
            this.updatingHistory();
        }
    }

    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            this._ws$.complete();
        }
    }

    loadAll() {
        this.http
            .get<IReturnedMessage[]>('/api/messages/history')
            .pipe(first(), takeUntilDestroyed(this.destroyRef))
            .subscribe((messageHistory) => {
                this.isError.set({
                    ...this.isError(),
                    load: !!messageHistory.length,
                });
                this._history$.next(messageHistory);
            });
    }

    sendMessage(message: string) {
        const user = toSignal(this.authService.returnedUser$, {
            injector: this.injector,
        })();

        this._ws$.next({
            message,
            user,
        });
    }

    private updatingHistory() {
        this._ws$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (returnedMessage) => {
                const message = returnedMessage as IReturnedMessage | undefined;

                message?.id &&
                    this._history$.next([...this._history$.value, message]);
            },
            error: (err) => {
                console.error('MessageHistoryService updatingHistory', err);
                this.isError.set({
                    ...this.isError(),
                    addMessage: true,
                });
            },
        });
    }
}
