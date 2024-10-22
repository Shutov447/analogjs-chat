import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IMessage } from '../lib';

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [],
    templateUrl: './message.component.html',
    styleUrl: './message.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
    readonly message = input.required<IMessage>();
}
