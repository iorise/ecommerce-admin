"use client";

import { toast } from "react-hot-toast";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/icons";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GripHorizontal } from "lucide-react";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export function ApiAlert({
  title,
  description,
  variant = "public",
}: ApiAlertProps) {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API route copied to the clipboard");
  };

  return (
    <Alert className="">
      <div className="flex w-full items-center gap-2 justify-between">
        <AlertTitle className="flex items-center gap-x-2">
          <Icons.server className="h-4 w-4" />
          {title}
          <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
        </AlertTitle>
        <Button size="sm" variant="ghost" className="flex justify-end" onClick={onCopy}>
          <Icons.copy className="w-4 h-4" />
        </Button>
      </div>
      <AlertDescription className="flex items-center justify-between gap-x-2">
        <code className="relative rounded bg-muted px[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
      </AlertDescription>
    </Alert>
  );
}
