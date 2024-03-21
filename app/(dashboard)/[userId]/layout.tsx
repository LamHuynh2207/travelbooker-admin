import { redirect } from 'next/navigation';

import Navbar from '@/components/navbar'
import prisma from '@/lib/prismadb';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { userId: string }
}) {
  const user = await prisma.user.findFirst({ 
    where: {
      id: params.userId,
    }
   });

  if (!user) {
    redirect('/');
  };

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};