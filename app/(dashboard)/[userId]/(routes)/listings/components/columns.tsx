"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ListingColumn = {
    id: string
    title: string;
    price: string;
    category: string;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
    locationValue: string;
    createdAt: string;
}

export const columns: ColumnDef<ListingColumn>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "roomCount",
        header: "Rooms",
    },
    {
        accessorKey: "bathroomCount",
        header: "Bathrooms",
    },
    {
        accessorKey: "guestCount",
        header: "Guests",
    },
    {
        accessorKey: "locationValue",
        header: "Location",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
];