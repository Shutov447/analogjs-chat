import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessageComponent, IMessage } from '@entities/message';
import { MessageFormComponent } from '@features/message-form';

@Component({
    selector: 'app-message-showcase',
    standalone: true,
    imports: [MessageComponent],
    templateUrl: './message-showcase.component.html',
    styleUrl: './message-showcase.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageShowcaseComponent {
    readonly messages: IMessage[] = [
        {
            id: 1,
            by: 'me',
            email: 'john@example.com',
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis excepturi architecto cum, odit numquam voluptates culpa dolore incidunt at tenetur non suscipit nostrum nisi, maxime dignissimos autem possimus quam sapiente? Suscipit necessitatibus voluptas earum dolorem ea labore natus impedit explicabo beatae fugiat harum facere quisquam quibusdam, itaque quas et voluptatem.`,
        },
        {
            id: 2,
            by: 'other',
            email: 'mike@example.com',
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis excepturi architecto cum, odit numquam voluptates culpa dolore incidunt at tenetur non suscipit nostrum nisi, maxime dignissimos autem possimus quam sapiente? Suscipit necessitatibus voluptas earum dolorem ea labore natus impedit explicabo beatae fugiat harum facere quisquam quibusdam, itaque quas et voluptatem.`,
        },
    ];
}
