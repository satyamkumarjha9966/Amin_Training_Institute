'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  subtitle?: string;
  href?: string;
  onClick?: () => void;
}

export function KPICard({
  title,
  value,
  icon,
  trend,
  subtitle,
  href,
  onClick,
}: KPICardProps) {
  const content = (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>

        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}

        {trend && (
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center space-x-1">
              {trend.direction === 'up' && (
                <TrendingUp className="h-3 w-3 text-green-500" />
              )}
              {trend.direction === 'down' && (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              {trend.direction === 'neutral' && (
                <Minus className="h-3 w-3 text-muted-foreground" />
              )}

              <span
                className={`text-xs ${
                  trend.direction === 'up'
                    ? 'text-green-500'
                    : trend.direction === 'down'
                    ? 'text-red-500'
                    : 'text-muted-foreground'
                }`}
              >
                {trend.direction !== 'neutral' &&
                  (trend.direction === 'up' ? '+' : '')}
                {trend.value}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  if (onClick) {
    return <div onClick={onClick}>{content}</div>;
  }

  return content;
}
