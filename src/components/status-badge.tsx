import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "healthy" | "warning" | "error";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "h-2 w-2 rounded-full p-0",
        status === "healthy" && "bg-green-500",
        status === "warning" && "bg-yellow-500",
        status === "error" && "bg-red-500",
        className
      )}
    />
  );
}
