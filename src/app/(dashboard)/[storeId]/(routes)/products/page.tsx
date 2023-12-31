import React from "react";
import format from "date-fns/format";

import prismaDb from "@/lib/prismadb";
import { formatPrice } from "@/lib/utils";

import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { Shell } from "@/components/shell";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await prismaDb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatPrice(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.name,
    createdAt: format(item.createdAt, "MMMM, do, yyyy"),
  }));
  return (
    <Shell>
      <ProductClient data={formattedProducts} />
    </Shell>
  );
}
