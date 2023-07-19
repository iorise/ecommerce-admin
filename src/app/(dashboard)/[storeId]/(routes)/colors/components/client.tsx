"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ColorColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface ColorsClientProps {
  data: ColorColumn[];
}

export function ColorsClient({ data }: ColorsClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes ${data.length}`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Icons.plus className="mr-2 w-4 h-4 " />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorsId" />
    </>
  );
}
