import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { SettingsForm } from "./components/settings-form";
import { Shell } from "@/components/shell";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismaDb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <div className="flex-col">
      <Shell>
        <SettingsForm initialData={store}/>
      </Shell>
    </div>
  );
}
