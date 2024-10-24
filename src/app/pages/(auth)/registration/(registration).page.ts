import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@entities/auth';
import { IUserAuthData } from '../../../../../src/shared/types';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegistrationComponent {
    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);

    readonly error = computed(() => this.authService.errors().registration);
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
        this.authService.registration(this.form.value as IUserAuthData);
    }
}
