import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    input,
} from '@angular/core';
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
    readonly elementRef = inject(ElementRef);
    readonly message = input.required<IMessage>();
}
