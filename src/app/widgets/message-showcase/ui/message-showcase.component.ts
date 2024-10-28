import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    OnInit,
    PLATFORM_ID,
    viewChildren,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@entities/auth';
import { MessageComponent, IMessage } from '@entities/message';
import { MessageHistoryService } from '@entities/message';

@Component({
    selector: 'app-message-showcase',
    standalone: true,
    imports: [MessageComponent],
    templateUrl: './message-showcase.component.html',
    styleUrl: './message-showcase.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageShowcaseComponent implements OnInit {
    private readonly messageHistoryService = inject(MessageHistoryService);
    private readonly authService = inject(AuthService);
    private readonly user = toSignal(this.authService.returnedUser$);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly messages = toSignal(this.messageHistoryService.history$);
    private readonly messageComponents = viewChildren(MessageComponent);
    private readonly onMessageHistoryChange = effect(() => {
        this.scrollToLastMessage('smooth');
    });

    readonly formattedMessages = computed(() =>
        this.messages()?.map(
            (message): IMessage => ({
                by: message.email === this.user()?.email ? 'me' : 'other',
                email: message.email,
                text: message.content,
                id: message.id,
            })
        )
    );

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.messageHistoryService.loadAll();
        }
    }

    scrollToLastMessage(behavior: ScrollBehavior) {
        const messageElem: HTMLElement =
            this.messageComponents().at(-1)?.elementRef.nativeElement;

        messageElem?.scrollIntoView({
            behavior,
            block: 'end',
        });
    }
}
