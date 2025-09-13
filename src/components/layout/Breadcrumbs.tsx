'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

export function Breadcrumbs() {
  const pathname = usePathname();
  // pathname like: /admin/enrollments/123
  const segments = (pathname || '').split('/').filter(Boolean);

  // Hide breadcrumbs on root or only /admin
  if (segments.length === 0 || segments[0] === 'admin' && segments.length === 1) {
    return null;
  }

  // Build items, but keep /admin as the root
  const startIndex = segments[0] === 'admin' ? 1 : 0;
  const visibleSegments = segments.slice(startIndex);

  const items = visibleSegments.map((segment, index) => {
    const path = '/admin/' + visibleSegments.slice(0, index + 1).join('/');
    const isLast = index === visibleSegments.length - 1;
    const title = segment
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return { path, title, isLast };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/admin" className="flex items-center" aria-label="Go to dashboard">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item) => (
          <div key={item.path} className="flex items-center">
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.path}>{item.title}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
