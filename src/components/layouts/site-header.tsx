import { UserButton, auth } from "@clerk/nextjs";

import { MainNav } from "@/components/layouts/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismaDb from "@/lib/prismadb";

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
    <header className="sticky top-0 z-[999] w-full border-b bg-background">
      <div className="container flex space-x-4 h-16 items-center">
        <StoreSwitcher items={stores} />
        <MainNav />
        <UserButton />
      </div>
    </header>
  );
}
