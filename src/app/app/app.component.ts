import { isPlatformBrowser } from '@angular/common';
import {
    Component,
    inject,
    Injector,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@entities/auth';

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
    private readonly injector = inject(Injector);
    private readonly platformId = inject(PLATFORM_ID);

    ngOnInit() {
        toSignal(this.authService.login(), {
            injector: this.injector,
        })();
        // if (isPlatformBrowser(this.platformId)) {
        // this.authByToken();
        // }
    }

    private authByToken() {
        try {
            toSignal(this.authService.login(), {
                injector: this.injector,
            })();
        } catch {
            this.authByToken();
        }
    }
}
