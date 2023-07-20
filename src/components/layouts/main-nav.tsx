"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
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
    <div className={cn("hidden gap-6 lg:flex", className)}>
      <NavigationMenu>
        <NavigationMenuList>
          {routes.map((item) => (
            <NavigationMenuItem key={item.label}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === item.href && "bg-[#1e293b]"
                  )}
                >
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
