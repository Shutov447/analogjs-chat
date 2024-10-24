import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@entities/auth';
import { first } from 'rxjs';
import { IUserAuthData } from 'src/shared/types';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    private readonly destroyRef = inject(DestroyRef);
    private readonly router = inject(Router);
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

    ngOnInit() {
        this.authService.errors.set({
            ...this.authService.errors(),
            login: false,
        });
    }

    submit() {
        this.authService
            .login(this.form.value as IUserAuthData)
            .pipe(takeUntilDestroyed(this.destroyRef), first())
            .subscribe((user) => user && this.router.navigate(['/']));
    }
}
