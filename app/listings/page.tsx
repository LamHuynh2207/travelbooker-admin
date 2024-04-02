import { PrismaClient } from '@prisma/client';
import { Card, Title, Text } from '@tremor/react';
import Search from '@/components/Search';
import ListingsTable from '@/components/ListingsTable';
const prisma = new PrismaClient();

interface Listing {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
}

type Props = {
    searchParams: {
        q?: string;
    };
};


export default async function Listing({ searchParams }: Props) {
    const query = searchParams.q;

    const listings = await prisma.listing.findMany({
        where: {
            title: {
                contains: query,
                mode: "insensitive",
            },
            description: {
                contains: query,
                mode: "insensitive",
            },
        },
    });

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>Listings</Title>
            <Text>A list of Listings retrieved from a Mongo database.</Text>
            <Search />
            <Card className="mt-6">
                <ListingsTable listings={listings.map(listing => ({
                    ...listing,
                    createdAt: new Date(),
                    roomCount: 0,
                    bathroomCount: 0,
                    guestCount: 0,
                    locationValue: "",
                    userId: "",
                }))} />

            </Card>
        </main>
    );
}
