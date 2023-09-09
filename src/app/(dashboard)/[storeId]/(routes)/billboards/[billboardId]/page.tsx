import React from "react";
import prismaDb from "@/lib/prismadb";

import { BillboardForm } from "./components/billboard-form";
import { Shell } from "@/components/shell";

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await prismaDb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <Shell>
      <BillboardForm initialData={billboard} />
    </Shell>
  );
}
