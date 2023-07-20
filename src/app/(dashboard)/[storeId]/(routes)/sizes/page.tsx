import React from "react";
import format from "date-fns/format";

import { SizesClient } from "./components/client";
import prismaDb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";
import { Shell } from "@/components/shell";

export default async function SizesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const sizes = await prismaDb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM, do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <Shell>
        <SizesClient data={formattedSizes} />
      </Shell>
    </div>
  );
}
