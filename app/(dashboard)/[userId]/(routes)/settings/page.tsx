import { redirect } from "next/navigation";

import prisma from "@/lib/prismadb";

import { SettingsForm } from "./components/settings-form";

const SettingsPage = async ({
  params
}: {
  params: { userId: string }
}) => {
  const user = await prisma.user.findFirst({
    where: {
      id: params.userId,
    }
  });

  if (!user) {
    redirect('/');
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={user} />
      </div>
    </div>
  );
}

export default SettingsPage;