import { UserButton, auth } from "@clerk/nextjs";

import { MainNav } from "@/components/layouts/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismaDb from "@/lib/prismadb";
import { MobileNav } from "@/components/layouts/mobile-nav";

export async function SiteHeader() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismaDb.store.findMany({
    where: {
      userId,
    },
  });
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex space-x-4 h-16 items-center">
        <StoreSwitcher items={stores} />
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
