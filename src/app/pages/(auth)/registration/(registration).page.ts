import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@entities/auth';
import { IUserAuthData } from '../../../../../src/shared/types';
import { first } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegistrationComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    private readonly destroyRef = inject(DestroyRef);
    private readonly router = inject(Router);
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

    ngOnInit() {
        this.authService.errors.set({
            ...this.authService.errors(),
            registration: false,
        });
    }
    submit() {
        this.authService
            .registration(this.form.value as IUserAuthData)
            .pipe(takeUntilDestroyed(this.destroyRef), first())
            .subscribe((res) => {
                res?.returnedUser && this.router.navigate(['/']);
            });
    }
}
