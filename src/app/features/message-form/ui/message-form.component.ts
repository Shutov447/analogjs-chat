import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@entities/auth';

@Component({
    selector: 'app-message-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './message-form.component.html',
    styleUrl: './message-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageFormComponent {
    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    readonly user = toSignal(this.authService.returnedUser$);

    readonly messageForm = this.fb.group({
        message: [''],
    });
}
