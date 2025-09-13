import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

const statusConfig = {
  // Contact Submission statuses
  new: { label: "New", variant: "outline" as const, color: "text-blue-600 bg-blue-50 border-blue-200" },
  "in-review": { label: "In Review", variant: "secondary" as const, color: "text-yellow-600 bg-yellow-50 border-yellow-200" },
  responded: { label: "Responded", variant: "default" as const, color: "text-green-600 bg-green-50 border-green-200" },
  closed: { label: "Closed", variant: "outline" as const, color: "text-gray-600 bg-gray-50 border-gray-200" },
  
  // Course Enrollment statuses
  pending: { label: "Pending", variant: "outline" as const, color: "text-orange-600 bg-orange-50 border-orange-200" },
  approved: { label: "Approved", variant: "default" as const, color: "text-green-600 bg-green-50 border-green-200" },
  rejected: { label: "Rejected", variant: "destructive" as const, color: "text-red-600 bg-red-50 border-red-200" },
  completed: { label: "Completed", variant: "secondary" as const, color: "text-purple-600 bg-purple-50 border-purple-200" },
  enrolled: { label: "Enrolled", variant: "default" as const, color: "text-blue-600 bg-blue-50 border-blue-200" },
  
  // Payment statuses
  paid: { label: "Paid", variant: "default" as const, color: "text-green-600 bg-green-50 border-green-200" },
  unpaid: { label: "Unpaid", variant: "destructive" as const, color: "text-red-600 bg-red-50 border-red-200" },
  partial: { label: "Partial", variant: "outline" as const, color: "text-yellow-600 bg-yellow-50 border-yellow-200" },
};

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const config = statusConfig[status.toLowerCase() as keyof typeof statusConfig];
  
  if (!config) {
    return (
      <Badge variant={variant || "outline"} className={className}>
        {status}
      </Badge>
    );
  }

  return (
    <Badge
      variant={variant || config.variant}
      className={cn(
        "border font-medium",
        config.color,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}