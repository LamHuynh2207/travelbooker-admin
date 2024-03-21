import prisma from "@/lib/prismadb";

interface GraphData {
  month: string;
  totalPrice: number;
}

export const getGraphPrice = async (userId: string): Promise<GraphData[]> => {
  const reservations = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      totalPrice: true,
      createdAt: true, // Assuming there's a createdAt or similar date field
    },
  });

  // Initialize a Map to hold monthly total prices
  const monthlyTotals = new Map<string, number>();

  reservations.forEach(reservation => {
    const month = reservation.createdAt.getMonth() + 1;
    const year = reservation.createdAt.getFullYear();
    const monthYear = `${month}-${year}`;

    if (!monthlyTotals.has(monthYear)) {
      monthlyTotals.set(monthYear, 0);
    }
    monthlyTotals.set(monthYear, monthlyTotals.get(monthYear)! + reservation.totalPrice);
  });

  // Convert Map to an array of GraphData
  const graphData: GraphData[] = Array.from(monthlyTotals, ([monthYear, totalPrice]) => ({
    month: monthYear,
    totalPrice
  }));

  return graphData;
};
