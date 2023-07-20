import React from "react";
import format from "date-fns/format";

import { BillboardClient } from "./components/client";
import prismaDb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";
import { Shell } from "@/components/shell";

export default async function BillboardsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await prismaDb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM, do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <Shell>
        <BillboardClient data={formattedBillboards} />
      </Shell>
    </div>
  );
}
