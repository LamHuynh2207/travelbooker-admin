import { CreditCard, DollarSign, Package } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { getTotalPriceOfAllReservations } from "@/actions/get-total-price";
import { getReservationsCount } from "@/actions/get-reservations-count";
import { getGraphData } from "@/actions/get-graph-price";
import { getListingsCount } from "@/actions/get-listings-count";
import { formatter } from "@/lib/utils";

interface DashboardPageProps {
  params: {
    userId: string;
  };
};

const DashboardPage: React.FC<DashboardPageProps> = async ({ 
  params
}) => {
  const totalPrice = await getTotalPriceOfAllReservations();
  const graphPrice = await getGraphData();
  const reservationsCount = await getReservationsCount(params.userId);
  const ListingsCount = await getListingsCount(params.userId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of Travel Booker website" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Price
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatter.format(totalPrice)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservations</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{reservationsCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total of available rental houses</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ListingsCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphPrice} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;