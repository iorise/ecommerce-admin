"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
    },
  ];
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          >
            <Icons.menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <ScrollArea className="my-6 h-[calc(100vh-8rem)] pb-10 pl-6 ">
            {routes.map((item) => (
              <>
                <div
                  key={item.label}
                  className={cn(
                    "flex flex-1 items-center justify-between py-4 font-medium text-sm transition-all hover:underline hover:cursor-pointer text-muted-foreground",
                    pathname === item.href && "text-foreground"
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </div>
              </>
            ))}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
