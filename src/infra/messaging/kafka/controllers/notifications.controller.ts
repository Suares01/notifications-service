import { Controller } from '@nestjs/common';
import { SendNotification } from '@app/use-cases/send-notification';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendNotificationPayload } from '../dtos/send-notification-payload.dto';

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(@Payload() message: SendNotificationPayload) {
    console.log(message);
    const { category, content, recipientId } = message;

    await this.sendNotification.execute({ category, content, recipientId });
  }
}
