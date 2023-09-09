import prismaDb from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";
import { Shell } from "@/components/shell";

export default async function ProductPage({
  params,
}: {
  params: { productId: string; storeId: string };
}) {
  const product = await prismaDb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismaDb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismaDb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismaDb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <Shell>
      <ProductForm
        initialData={product}
        categories={categories}
        sizes={sizes}
        colors={colors}
      />
    </Shell>
  );
}
