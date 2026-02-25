import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThesisCard } from '@/components/cards/ThesisCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { Container } from '@/components/layout/Container';
import { theses } from '@/data/mockData';
import { useFilterStore } from '@/stores';
import { useDebounce } from '@/hooks';

import { FilterSidebar } from '@/components/filters/FilterSidebar';

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

export default function ThesisFeed() {
    const { filters, setSearch, activeFilterCount, clearFilters } = useFilterStore();
    const debouncedSearch = useDebounce(filters.search, 300);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const filtered = useMemo(() => {
        return theses.filter((t) => {
            const search = debouncedSearch.toLowerCase();
            if (search && !t.title.toLowerCase().includes(search) &&
                !t.shortDescription.toLowerCase().includes(search) &&
                !t.organization.name.toLowerCase().includes(search) &&
                !t.field.toLowerCase().includes(search)) {
                return false;
            }
            if (filters.field.length && !filters.field.includes(t.field)) return false;
            if (filters.location.length && !filters.location.includes(t.location)) return false;
            if (filters.duration.length && !filters.duration.includes(t.duration)) return false;
            if (filters.compensation.length && !filters.compensation.includes(t.compensation)) return false;
            if (filters.workType.length && !filters.workType.includes(t.type)) return false;
            return true;
        });
    }, [debouncedSearch, filters.field, filters.location, filters.duration, filters.compensation, filters.workType]);

    const count = activeFilterCount();

    return (
        <div className="min-h-screen bg-background">

            {/* ── Header ── */}
            <PageHeader
                badge="Explore"
                title="Thesis Opportunities"
                description="Discover thesis projects from leading universities and industry partners across Scandinavia."
            />

            {/* ── Body ── */}
            <Container className="py-8 lg:py-10">

                {/* Search + Mobile Filter Toggle */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by title, organization, or field..."
                            value={filters.search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 h-11 bg-card w-full"
                        />
                    </div>

                    <span className="hidden sm:inline text-xs text-muted-foreground whitespace-nowrap shrink-0">
                        {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
                    </span>

                    {/* Mobile Filter Sheet */}
                    <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="lg:hidden gap-2 shrink-0 h-11">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                                {count > 0 && (
                                    <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                                        {count}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-80 overflow-y-auto px-5">
                            <SheetHeader>
                                <SheetTitle>Filters</SheetTitle>
                            </SheetHeader>
                            <div className="mt-4">
                                <FilterSidebar hideDuration />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Active filter chips */}
                {count > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                        <span className="text-xs text-muted-foreground">Active filters:</span>
                        {Object.entries(filters).map(([key, val]) => {
                            if (key === 'search' || !Array.isArray(val)) return null;
                            return val.map((v: string) => (
                                <Badge
                                    key={`${key}-${v}`}
                                    variant="secondary"
                                    className="gap-1 text-xs cursor-pointer hover:bg-destructive/10"
                                    onClick={() => useFilterStore.getState().toggleFilter(key as any, v)}
                                >
                                    {v}
                                    <X className="w-3 h-3" />
                                </Badge>
                            ));
                        })}
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7">
                            Clear all
                        </Button>
                    </div>
                )}

                {/* Sidebar + Cards */}
                <div className="flex gap-6 lg:gap-8 items-start">

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-60 xl:w-64 shrink-0">
                        <div className="sticky top-24 rounded-xl border border-border/50 bg-card p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                            <FilterSidebar hideDuration />
                        </div>
                    </aside>

                    {/* Results grid */}
                    <div className="flex-1 min-w-0">
                        {/* Mobile result count */}
                        <p className="sm:hidden text-xs text-muted-foreground mb-4">
                            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
                        </p>

                        {filtered.length > 0 ? (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                                // `items-stretch` (the grid default) equalises row heights.
                                // Each motion.div must also be a flex column so ThesisCard
                                // can grow to fill the full cell height via `h-full`.
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                                style={{ alignItems: 'stretch' }}
                            >
                                {filtered.map((thesis) => (
                                    <motion.div
                                        key={thesis.id}
                                        variants={fadeUp}
                                        className="h-full"
                                    >
                                        <ThesisCard thesis={thesis} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-4">
                                    <Search className="w-7 h-7" />
                                </div>
                                <h3
                                    className="text-lg font-semibold mb-2"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    No thesis found in this field yet
                                </h3>
                                <p className="text-sm text-muted-foreground max-w-sm mb-6">
                                    Be the first to explore new opportunities. Try adjusting your filters or search terms.
                                </p>
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}