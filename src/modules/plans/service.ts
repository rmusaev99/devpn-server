import { database } from '@/database';
import { Plan, User } from '@prisma/client';
import dayjs from 'dayjs';
import ms from 'ms';

export const planService = {
  getCurrentUsageForUser: (userId: User['id']) =>
    database.monthlyUsage.findFirst({
      where: {
        userId: userId,
        year: dayjs().year(),
        month: dayjs().month(),
      },
    }),

  activatePlan: async (userId: User['id'], planId: Plan['id']) => {
    const plan = await database.plan.findUnique({
      where: {
        id: planId,
      },
    });

    if (!plan) {
      throw new Error('Plan not found.');
    }

    const startDate = new Date();
    const endDate = new Date(
      Date.now() + plan.duration + ms(`${plan.duration} days`)
    );

    await database.subscription.create({
      data: {
        startDate,
        endDate,
        User: {
          connect: {
            id: userId,
          },
        },
        Plan: {
          connect: {
            id: plan.id,
          },
        },
      },
    });

    await database.monthlyUsage.create({
      data: {
        User: {
          connect: {
            id: userId,
          },
        },
        year: dayjs().year(),
        month: dayjs().month(),
        limit: plan.usageLimit,
        usedLimit: 0,
      },
    });
  },
};
