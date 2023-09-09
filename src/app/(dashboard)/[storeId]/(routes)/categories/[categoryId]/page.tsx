import React from "react";
import prismaDb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";
import { Shell } from "@/components/shell";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  const category = await prismaDb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismaDb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <Shell>
      <CategoryForm initialData={category} billboards={billboards} />
    </Shell>
  );
}
