import React from "react";
import format from "date-fns/format";

import { ColorsClient } from "./components/client";
import prismaDb from "@/lib/prismadb";
import { ColorColumn } from "./components/columns";
import { Shell } from "@/components/shell";

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await prismaDb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM, do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <Shell>
        <ColorsClient data={formattedColors} />
      </Shell>
    </div>
  );
}
