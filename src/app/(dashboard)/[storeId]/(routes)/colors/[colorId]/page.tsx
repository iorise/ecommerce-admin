import React from "react";
import prismaDb from "@/lib/prismadb";

import { ColorForm } from "./components/color-form";
import { Shell } from "@/components/shell";

export default async function ColorPage({
  params,
}: {
  params: { colorId: string };
}) {
  const color = await prismaDb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <Shell>
      <ColorForm initialData={color} />
    </Shell>
  );
}
