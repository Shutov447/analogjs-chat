import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
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
    private readonly platformId = inject(PLATFORM_ID);

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.authByToken();
        }
    }

    private authByToken() {
        try {
            this.authService.login();
        } catch {
            this.authByToken();
        }
    }
}
