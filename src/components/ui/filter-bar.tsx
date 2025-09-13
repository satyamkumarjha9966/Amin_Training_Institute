import { useState } from "react";
import { Search, Filter, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FilterChip {
  id: string;
  label: string;
  value: string;
}

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters: FilterChip[];
  onRemoveFilter: (filterId: string) => void;
  onClearAll: () => void;
  children?: React.ReactNode; // Advanced filters content
  placeholder?: string;
}

export function FilterBar({
  searchValue,
  onSearchChange,
  filters,
  onRemoveFilter,
  onClearAll,
  children,
  placeholder = "Search..."
}: FilterBarProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Search and Filter Controls */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {children && (
          <Sheet open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
                {filters.length > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filters.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px]">
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
                <SheetDescription>
                  Use the filters below to narrow down your results.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                {children}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {filters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filter Chips */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter.id}
              variant="secondary"
              className="flex items-center space-x-1 pr-1"
            >
              <span className="text-xs">{filter.label}: {filter.value}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => onRemoveFilter(filter.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}