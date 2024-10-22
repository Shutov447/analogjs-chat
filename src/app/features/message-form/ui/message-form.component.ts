import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

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

    readonly messageForm = this.fb.group({
        message: [''],
    });
}
