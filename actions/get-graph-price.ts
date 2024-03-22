import { PrismaClient } from '@prisma/client';
import { groupBy, sumBy } from 'lodash';

const prisma = new PrismaClient();

// Function to get data and format it for Recharts
export const getGraphData = async () => {
  const reservations = await prisma.reservation.findMany({
    select: {
      startDate: true,
      totalPrice: true,
    },
  });

  // Group reservations by year and month
  const groupedByMonth = groupBy(reservations, (reservation) =>
    `${reservation.startDate.getFullYear()}-${String(reservation.startDate.getMonth() + 1).padStart(2, '0')}`
  );

  // Initialize graph data for all months in the year(s) present in the data
  const years = Object.keys(groupedByMonth).map(date => date.split('-')[0]);
  const uniqueYears = [...new Set(years)]; // Get unique years

  interface GraphDataItem {
    name: string;
    total: number;
  }

  // Sử dụng GraphDataItem[] làm kiểu cho graphData
  const graphData: GraphDataItem[] = [];

  uniqueYears.forEach(year => {
    for (let month = 1; month <= 12; month++) {
      // Format month to match groupedByMonth keys
      const monthFormatted = `${month}`.padStart(2, '0');
      const key = `${year}-${monthFormatted}`;

      // Calculate total price for each month and format for Recharts
      const total = sumBy(groupedByMonth[key], 'totalPrice');
      graphData.push({
        name: key, // 'name' will be used for XAxis in Recharts
        total, // 'total' will be used for Bar value
      });
    }
  });

  return graphData;
};
