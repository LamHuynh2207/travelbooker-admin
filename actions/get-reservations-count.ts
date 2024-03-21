import prisma from "@/lib/prismadb";

export const getReservationsCount = async (userId: string) => {
    const reservationsCount = await prisma.reservation.count({
        where: {
            userId: userId,
        },
    });

    return reservationsCount;
};