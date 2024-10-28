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
export default class HomeComponent {}
