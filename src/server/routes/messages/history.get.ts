import { defineEventHandler } from 'h3';
import { IReturnedMessage } from '../../../shared/types';
import { messageRepo, userRepo } from '../../../main.server';

export default defineEventHandler(async (): Promise<IReturnedMessage[]> => {
    try {
        const messages = await messageRepo.findAll();
        const returnedMessages = await Promise.all(
            messages.map(async (message) => {
                const { senderId } = message;
                const user = await userRepo.findById(senderId);

                return user
                    ? {
                          email: user.email,
                          content: message.content,
                          id: message.id,
                      }
                    : null;
            })
        );

        return returnedMessages.filter(
            (returnedMessage) => !!returnedMessage
        ) as IReturnedMessage[];
    } catch (error) {
        console.error('Error in messages/get.ts', error);

        return [
            { email: 'error', content: 'error on get messages route', id: -1 },
        ];
    }
});
