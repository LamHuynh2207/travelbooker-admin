import prisma from "@/lib/prismadb";

export const getListingsCount = async (userId: string) => {
  const listingsCount = await prisma.listing.count({
    where: {
        userId: userId,
    }
  });

  return listingsCount;
};