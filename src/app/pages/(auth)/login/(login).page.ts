import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@entities/auth';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);

    readonly error = computed(() => this.authService.errors().login);
    readonly form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
    });

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

    submit() {
        this.authService.login();
    }
}
