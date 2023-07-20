import React from "react";
import format from "date-fns/format";

import { OrderClient } from "./components/client";
import prismaDb from "@/lib/prismadb";
import { OrderColumn } from "./components/columns";
import { formatPrice } from "@/lib/utils";
import { Shell } from "@/components/shell";

export default async function OrdersPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await prismaDb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatPrice(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM, do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <Shell>
        <OrderClient data={formattedOrders} />
      </Shell>
    </div>
  );
}
