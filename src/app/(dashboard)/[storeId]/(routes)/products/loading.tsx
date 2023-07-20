import { Shell } from "@/components/shell";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Shell>
      <div className="flex items-center justify-between">
        <Skeleton className="h-14 w-62" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Separator />
      <div>
        <Skeleton className="h-8 w-96" />
      </div>
      <div className="grid gap-10 rounded-lg border p-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-8 w-40" />
      </div>
    </Shell>
  );
}
