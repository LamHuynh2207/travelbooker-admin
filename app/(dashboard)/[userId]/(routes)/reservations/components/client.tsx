"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, ReservationColumn } from "./columns";

interface ReservationClientProps {
  data: ReservationColumn[];
}

export const ReservationClient: React.FC<ReservationClientProps> = ({
  data
}) => {
  return (
    <>
      <Heading title={`Reservations (${data.length})`} description="Manage Reservations for your user" />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};