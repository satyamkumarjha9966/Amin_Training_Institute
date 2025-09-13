import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  count?: number;
  actions?: ReactNode;
  stats?: Array<{
    label: string;
    value: number;
    variant?: "default" | "secondary" | "destructive" | "outline";
  }>;
}

export function PageHeader({ title, subtitle, count, actions, stats }: PageHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
            {count !== undefined && (
              <Badge variant="secondary" className="text-xs">
                {count.toLocaleString()}
              </Badge>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>

      {stats && stats.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {stats.map((stat, index) => (
            <Badge key={index} variant={stat.variant || "outline"} className="text-xs">
              {stat.label}: {stat.value.toLocaleString()}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}