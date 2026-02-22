import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { IdeaCard } from '@/components/cards/IdeaCard';
import { thesisIdeas } from '@/data/mockData';
import { useDebounce } from '@/hooks';
import { FIELDS } from '@/types';

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

export default function IdeasFeed() {
    const [search, setSearch] = useState('');
    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    const [selectedFunding, setSelectedFunding] = useState<string[]>([]);
    const debouncedSearch = useDebounce(search, 300);

    const toggleField = (field: string) =>
        setSelectedFields((prev) => prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]);

    const toggleFunding = (f: string) =>
        setSelectedFunding((prev) => prev.includes(f) ? prev.filter((v) => v !== f) : [...prev, f]);

    const filtered = useMemo(() => {
        return thesisIdeas.filter((idea) => {
            const q = debouncedSearch.toLowerCase();
            if (q && !idea.title.toLowerCase().includes(q) &&
                !idea.shortAbstract.toLowerCase().includes(q) &&
                !idea.field.toLowerCase().includes(q)) {
                return false;
            }
            if (selectedFields.length && !selectedFields.includes(idea.field)) return false;
            if (selectedFunding.length && !selectedFunding.includes(idea.fundingInterest)) return false;
            return true;
        });
    }, [debouncedSearch, selectedFields, selectedFunding]);

    const clearAll = () => { setSelectedFields([]); setSelectedFunding([]); setSearch(''); };
    const activeCount = selectedFields.length + selectedFunding.length;

    const FilterContent = () => (
        <div className="space-y-4">
            <div>
                <h4 className="text-sm font-semibold mb-2">Field</h4>
                <div className="space-y-1">
                    {FIELDS.map((f) => (
                        <button
                            key={f}
                            onClick={() => toggleField(f)}
                            className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${selectedFields.includes(f) ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="text-sm font-semibold mb-2">Funding Interest</h4>
                <div className="space-y-1">
                    {['seeking', 'open', 'not-needed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => toggleFunding(f)}
                            className={`w-full text-left px-3 py-1.5 text-sm rounded-md capitalize transition-colors ${selectedFunding.includes(f) ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}
                        >
                            {f.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">

            {/* ── Header ── */}
            <div className="border-b border-border/50">
                <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <Badge variant="secondary" className="mb-3 text-xs">Innovation</Badge>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                            Thesis Ideas
                        </h1>
                        <p className="text-sm text-muted-foreground max-w-xl">
                            Explore innovative research ideas from students across Scandinavia. Fund the next breakthrough.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

                {/* Search + Mobile Filter Toggle */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search ideas..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 h-11 bg-card w-full"
                        />
                    </div>

                    <span className="hidden sm:inline text-xs text-muted-foreground whitespace-nowrap shrink-0">
                        {filtered.length} {filtered.length === 1 ? 'idea' : 'ideas'}
                    </span>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="lg:hidden gap-2 shrink-0 h-11">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                                {activeCount > 0 && (
                                    <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                                        {activeCount}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-80 overflow-y-auto">
                            <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                            <div className="mt-4"><FilterContent /></div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Sidebar + Cards */}
                <div className="flex gap-6 lg:gap-8 items-start">

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-60 xl:w-64 shrink-0">
                        <div className="sticky top-24 rounded-xl border border-border/50 bg-card p-4">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50">
                                <h3 className="text-sm font-semibold">Filters</h3>
                                {activeCount > 0 && (
                                    <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs h-7">
                                        Clear
                                    </Button>
                                )}
                            </div>
                            <FilterContent />
                        </div>
                    </aside>

                    {/* Results grid */}
                    <div className="flex-1 min-w-0">
                        {/* Mobile result count */}
                        <p className="sm:hidden text-xs text-muted-foreground mb-4">
                            {filtered.length} {filtered.length === 1 ? 'idea' : 'ideas'}
                        </p>

                        {filtered.length > 0 ? (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                style={{ alignItems: 'stretch' }}
                            >
                                {filtered.map((idea) => (
                                    <motion.div
                                        key={idea.id}
                                        variants={fadeUp}
                                        className="h-full"
                                    >
                                        <IdeaCard idea={idea} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-4">
                                    <Lightbulb className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                    No ideas match your search
                                </h3>
                                <p className="text-sm text-muted-foreground max-w-sm mb-6">
                                    Be the first to share your research vision. Great ideas deserve to be seen.
                                </p>
                                <Button variant="outline" onClick={clearAll}>Clear Filters</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}