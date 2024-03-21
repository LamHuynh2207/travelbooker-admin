import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTotalPrice = async (reservationId: string) => {
const reservation = await prisma.reservation.findUnique({
    where: {
        id: reservationId,
    },
    select: {
        totalPrice: true,
    },
});

if (!reservation) {
    throw new Error(`No reservation found with id: ${reservationId}`);
}

  return reservation.totalPrice;
}