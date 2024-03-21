import { redirect } from 'next/navigation';

import prisma from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await prisma.user.findFirst({
    where: {
        name: 'admin',
    }
  });

  if (user) {
    redirect(`/${user.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};