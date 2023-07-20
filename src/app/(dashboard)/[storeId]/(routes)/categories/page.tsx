import React from "react";
import format from "date-fns/format";

import { CategoryClient } from "./components/client";
import prismaDb from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";
import { Shell } from "@/components/shell";

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await prismaDb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM, do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <Shell>
        <CategoryClient data={formattedCategories} />
      </Shell>
    </div>
  );
}
