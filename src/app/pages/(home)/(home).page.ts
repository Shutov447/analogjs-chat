import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessageComponent } from '@entities/message';
import { MessageFormComponent } from '@features/message-form';
import { MessageShowcaseComponent } from '@widgets/message-showcase';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [MessageComponent, MessageShowcaseComponent, MessageFormComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
    readonly messages = [
        {
            by: 'other',
            email: 'john@example.com',
            message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis excepturi architecto cum, odit numquam voluptates culpa dolore incidunt at tenetur non suscipit nostrum nisi, maxime dignissimos autem possimus quam sapiente? Suscipit necessitatibus voluptas earum dolorem ea labore natus impedit explicabo beatae fugiat harum facere quisquam quibusdam, itaque quas et voluptatem.`,
        },
        {
            by: 'me',
            email: 'mike@example.com',
            message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis excepturi architecto cum, odit numquam voluptates culpa dolore incidunt at tenetur non suscipit nostrum nisi, maxime dignissimos autem possimus quam sapiente? Suscipit necessitatibus voluptas earum dolorem ea labore natus impedit explicabo beatae fugiat harum facere quisquam quibusdam, itaque quas et voluptatem.`,
        },
    ];
}
