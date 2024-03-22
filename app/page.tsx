import { PrismaClient } from '@prisma/client';
import { Card, Title, Text } from '@tremor/react';
import Search from '../components/Search';
import UsersTable from '../components/UsersTable';

const prisma = new PrismaClient();

interface User {
  id: string;
  name: string;
  email: string;
}

type Props = {
  searchParams: {
    q?: string;
  };
};


export default async function Home({ searchParams }: Props) {
  const query = searchParams.q;
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      email: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Mongo database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users.map(user => ({
          ...user,
          emailVerified: null,
          image: null,
          hashedPassword: null,
          updatedAt: new Date(),
          favoriteIds: [],
        }))} />
      </Card>
    </main>
  );
}
