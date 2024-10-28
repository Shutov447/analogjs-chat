import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@entities/auth';
import { MessageHistoryService } from '@entities/message';

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
    private readonly messageHistoryService = inject(MessageHistoryService);

    readonly isMessageErr = computed(
        () => this.messageHistoryService.isError().addMessage
    );
    readonly user = toSignal(this.authService.returnedUser$);
    readonly form = this.fb.group({
        message: ['', [Validators.required]],
    });

    get message() {
        return this.form.get('message');
    }

    setMessageError(addMessage: boolean) {
        this.messageHistoryService.isError.set({
            ...this.messageHistoryService.isError(),
            addMessage,
        });
    }

    submit() {
        this.message?.value &&
            this.messageHistoryService.sendMessage(this.message.value);
        this.message?.patchValue('');
    }
}
