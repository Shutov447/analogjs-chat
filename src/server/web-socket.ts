import { IReturnedMessage, IReturnedUser } from '../../src/shared/types';
import { WebSocket, WebSocketServer } from 'ws';
import { IUserRepository } from './repositories/user';
import { IMessageRepository } from './repositories/message';

export class WebSocketMessageController {
    private readonly wss = new WebSocketServer({
        host: this.host,
        port: this.port,
    });

    constructor(
        readonly host: string,
        readonly port: number,
        private readonly userRepo: IUserRepository,
        private readonly messageRepo: IMessageRepository
    ) {}

    listenTo() {
        this.onConnection();
        this.onError();
    }

    onConnection() {
        this.wss.on('connection', (ws) => {
            ws.on('error', console.error);
            console.log('connect to WebSocket from server');

            this.onSendMessage(ws);
        });
    }

    onError() {
        this.wss.on('error', (ws) => {
            console.error(
                'WebSocket server error (but actually it works):',
                ws
            );
        });
    }

    onSendMessage(ws: WebSocket) {
        ws.on('message', async (data) => {
            let messageToReturn: string;

            try {
                const json = JSON.parse(data.toString());

                if (!json?.user) return undefined;

                const { message, user } = json as unknown as {
                    message: string;
                    user: IReturnedUser;
                };

                const foundUser = await this.userRepo.findByEmail(user.email);

                if (!foundUser) throw new Error('User not found');

                const createdMessage = await this.messageRepo.create({
                    content: message,
                    senderId: foundUser.id,
                });

                messageToReturn = JSON.stringify({
                    ...createdMessage,
                    email: foundUser.email,
                });
            } catch (error) {
                console.error(error);
                messageToReturn = JSON.stringify(null);
            }

            this.wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(messageToReturn);
                }
            });
        });
    }
}
