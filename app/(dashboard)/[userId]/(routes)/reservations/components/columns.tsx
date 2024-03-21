"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ReservationColumn = {
    id: string;
    startDate: string;
    endDate: string;
    totalPrice: string;
    createdAt: string;
}

export const columns: ColumnDef<ReservationColumn>[] = [
    {
        accessorKey: "startDate",
        header: "Start Date",
    },
    {
        accessorKey: "endDate",
        header: "End Date",
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
];