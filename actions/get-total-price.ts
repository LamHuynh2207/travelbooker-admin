import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTotalPriceOfAllReservations = async () => {
  const result = await prisma.reservation.aggregate({
    _sum: {
      totalPrice: true,
    },
  });

  if (!result._sum.totalPrice) {
    throw new Error('No reservations found or total price is zero.');
  }

  return result._sum.totalPrice;
};
