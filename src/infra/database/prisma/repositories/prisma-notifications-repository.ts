import { Notification } from '@app/entities/notification/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    return notification
      ? PrismaNotificationMapper.toDomain(notification)
      : null;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data,
    });
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
