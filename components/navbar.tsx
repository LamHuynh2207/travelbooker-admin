import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import UserSwitcher from "@/components/user-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import prisma from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const users = await prisma.user.findMany({
    where: {
        id: userId,
    }
  });

return ( 
    <div className="border-b">
        <div className="flex h-16 items-center px-4">
            <UserSwitcher items={users} />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
                <ThemeToggle />
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    </div>
);
};
 
export default Navbar;