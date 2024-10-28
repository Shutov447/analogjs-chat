import { isPlatformBrowser } from '@angular/common';
import {
    Component,
    DestroyRef,
    inject,
    Injector,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@entities/auth';
import { catchError } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: `<router-outlet />`,
    styles: `:host {
        display: block;
        width: 100vw;
        height: 100vh;
    }`,
})
export class AppComponent implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly injector = inject(Injector);
    private readonly destroyRef = inject(DestroyRef);

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.authByToken();
        }
    }

    private authByToken() {
        toSignal(
            this.authService.login().pipe(
                takeUntilDestroyed(this.destroyRef),
                catchError(() => this.authService.login())
            ),
            {
                injector: this.injector,
            }
        )();
    }
}
