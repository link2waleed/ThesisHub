import { useFilterStore } from '@/stores';
import { FIELDS, LOCATIONS, DURATIONS, COMPENSATION_TYPES, WORK_TYPES } from '@/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterGroupProps {
    title: string;
    options: readonly string[];
    filterKey: 'field' | 'location' | 'duration' | 'compensation' | 'workType';
    defaultOpen?: boolean;
}

function FilterGroup({ title, options, filterKey, defaultOpen = true }: FilterGroupProps) {
    const { filters, toggleFilter } = useFilterStore();
    const [open, setOpen] = useState(defaultOpen);
    const active = filters[filterKey] as string[];

    return (
        <div className="py-3">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-colors duration-150"
            >
                {title}
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="mt-2.5 space-y-1">
                    {options.map((option) => {
                        const isActive = active.includes(option);
                        return (
                            <button
                                key={option}
                                onClick={() => toggleFilter(filterKey, option)}
                                className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${isActive
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                    }`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export function FilterSidebar() {
    const { clearFilters, activeFilterCount } = useFilterStore();
    const count = activeFilterCount();

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground">Filters</h3>
                {count > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7 text-muted-foreground">
                        Clear all
                    </Button>
                )}
            </div>

            <Separator className="mb-1" />

            <FilterGroup title="Field" options={FIELDS} filterKey="field" />
            <Separator />
            <FilterGroup title="Location" options={LOCATIONS} filterKey="location" />
            <Separator />
            <FilterGroup title="Duration" options={DURATIONS} filterKey="duration" />
            <Separator />
            <FilterGroup title="Compensation" options={COMPENSATION_TYPES} filterKey="compensation" defaultOpen={false} />
            <Separator />
            <FilterGroup title="Work Type" options={WORK_TYPES} filterKey="workType" defaultOpen={false} />
        </div>
    );
}
