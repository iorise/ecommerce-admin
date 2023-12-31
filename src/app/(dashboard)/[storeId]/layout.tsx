import React, { useId } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismaDb from "@/lib/prismadb";
import { SiteHeader } from "@/components/layouts/site-header";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
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
    <>
      <SiteHeader />
      {children}
    </>
  );
}
