import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFilterStore } from '@/stores';
import { FIELDS, DURATIONS, COMPENSATION_TYPES, WORK_TYPES } from '@/types';
import { ChevronDown, ChevronRight, X, Search } from 'lucide-react';

/* ─── Location hierarchy data ─── */
const LOCATION_GROUPS = [
    {
        country: 'Sweden',
        cities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Lund', 'Linköping', 'Umeå'],
    },
    {
        country: 'Denmark',
        cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg'],
    },
    {
        country: 'Norway',
        cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'],
    },
    {
        country: 'Finland',
        cities: ['Helsinki', 'Espoo', 'Tampere', 'Turku', 'Oulu'],
    },
    {
        country: 'Germany',
        cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Stuttgart', 'Cologne', 'Düsseldorf'],
    },
    {
        country: 'United Kingdom',
        cities: ['London', 'Manchester', 'Edinburgh', 'Cambridge', 'Oxford', 'Bristol', 'Birmingham'],
    },
    {
        country: 'Netherlands',
        cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Delft'],
    },
    {
        country: 'Switzerland',
        cities: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne'],
    },
    {
        country: 'France',
        cities: ['Paris', 'Lyon', 'Toulouse', 'Marseille', 'Grenoble', 'Strasbourg'],
    },
    {
        country: 'Belgium',
        cities: ['Brussels', 'Antwerp', 'Ghent', 'Leuven'],
    },
    {
        country: 'Austria',
        cities: ['Vienna', 'Graz', 'Linz', 'Salzburg'],
    },
    {
        country: 'Ireland',
        cities: ['Dublin', 'Cork', 'Galway', 'Limerick'],
    },
    {
        country: 'Spain',
        cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao'],
    },
    {
        country: 'Italy',
        cities: ['Milan', 'Rome', 'Turin', 'Bologna', 'Florence'],
    },
    {
        country: 'Portugal',
        cities: ['Lisbon', 'Porto', 'Braga'],
    },
    {
        country: 'Poland',
        cities: ['Warsaw', 'Kraków', 'Wrocław', 'Gdańsk', 'Poznań'],
    },
    {
        country: 'Czech Republic',
        cities: ['Prague', 'Brno', 'Ostrava'],
    },
    {
        country: 'Estonia',
        cities: ['Tallinn', 'Tartu'],
    },
    {
        country: 'United States',
        cities: ['New York', 'San Francisco', 'Boston', 'Seattle', 'Austin', 'Chicago', 'Los Angeles'],
    },
    {
        country: 'Canada',
        cities: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa', 'Calgary'],
    },
    {
        country: 'Remote',
        cities: ['Remote'],
    },
];

/* ─── Animated collapse ─── */
function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="overflow-hidden"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ─── Custom checkbox ─── */
function FilterCheckbox({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="flex items-center gap-3 w-full px-2 py-1.5 rounded-md cursor-pointer transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left"
        >
            <span
                className={`flex items-center justify-center w-4 h-4 rounded border shrink-0 transition-all duration-150 ${checked
                    ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500'
                    : 'border-slate-300 dark:border-slate-600'
                    }`}
            >
                {checked && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </span>
            <span className={`text-sm transition-colors duration-150 ${checked ? 'text-slate-900 dark:text-slate-100 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                {label}
            </span>
        </button>
    );
}

/* ─── Active filter tag ─── */
function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <motion.button
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onClick={onRemove}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-medium cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-950/60 transition-colors"
        >
            {label}
            <X className="w-3 h-3" />
        </motion.button>
    );
}

/* ─── Collapsible filter section ─── */
function FilterSection({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-slate-100 dark:border-slate-800 last:border-b-0">
            <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-3.5 text-left">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </motion.span>
            </button>
            <Collapse open={open}>
                <div className="pb-3">{children}</div>
            </Collapse>
        </div>
    );
}

/* ─── Hierarchical location filter ─── */
function LocationFilter({ filterSearch }: { filterSearch: string }) {
    const { filters, toggleFilter } = useFilterStore();
    const activeLocations = filters.location as string[];
    const [expandedCountries, setExpandedCountries] = useState<string[]>([]);

    const toggleCountry = (country: string) => {
        setExpandedCountries((prev) =>
            prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
        );
    };

    const filteredGroups = useMemo(() => {
        if (!filterSearch) return LOCATION_GROUPS;
        const q = filterSearch.toLowerCase();
        return LOCATION_GROUPS
            .map((g) => ({
                ...g,
                cities: g.cities.filter((c) => c.toLowerCase().includes(q) || g.country.toLowerCase().includes(q)),
            }))
            .filter((g) => g.cities.length > 0);
    }, [filterSearch]);

    const countSelected = (cities: string[]) => cities.filter((c) => activeLocations.includes(c)).length;

    return (
        <div className="space-y-0.5 max-h-[260px] overflow-y-auto pr-1">
            {filteredGroups.map((group) => {
                const isExpanded = expandedCountries.includes(group.country) || !!filterSearch;
                const selected = countSelected(group.cities);

                // Remote is flat, not nested
                if (group.country === 'Remote') {
                    return (
                        <FilterCheckbox
                            key="Remote"
                            label="Remote"
                            checked={activeLocations.includes('Remote')}
                            onToggle={() => toggleFilter('location', 'Remote')}
                        />
                    );
                }

                return (
                    <div key={group.country}>
                        {/* Country header */}
                        <button
                            type="button"
                            onClick={() => toggleCountry(group.country)}
                            className="flex items-center justify-between w-full px-2 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                        >
                            <div className="flex items-center gap-2">
                                <motion.span
                                    animate={{ rotate: isExpanded ? 90 : 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                </motion.span>
                                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{group.country}</span>
                            </div>
                            {selected > 0 && (
                                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded-full">
                                    {selected}
                                </span>
                            )}
                        </button>

                        {/* City list */}
                        <Collapse open={isExpanded}>
                            <div className="pl-4 space-y-0">
                                {group.cities.map((city) => (
                                    <FilterCheckbox
                                        key={city}
                                        label={city}
                                        checked={activeLocations.includes(city)}
                                        onToggle={() => toggleFilter('location', city)}
                                    />
                                ))}
                            </div>
                        </Collapse>
                    </div>
                );
            })}
        </div>
    );
}

/* ═══════════════════════════════════════════════
   MAIN FILTER SIDEBAR
   ═══════════════════════════════════════════════ */
export function FilterSidebar({ hideDuration = false }: { hideDuration?: boolean } = {}) {
    const { filters, toggleFilter, clearFilters, activeFilterCount } = useFilterStore();
    const [filterSearch, setFilterSearch] = useState('');
    const count = activeFilterCount();

    // Gather all active filters for tags
    const activeTags = useMemo(() => {
        const tags: { key: string; value: string }[] = [];
        (Object.keys(filters) as (keyof typeof filters)[]).forEach((key) => {
            if (key === 'search') return;
            const arr = filters[key] as string[];
            arr.forEach((v) => tags.push({ key, value: v }));
        });
        return tags;
    }, [filters]);

    // Filter options by search
    const match = (label: string) =>
        !filterSearch || label.toLowerCase().includes(filterSearch.toLowerCase());

    const filteredFields = FIELDS.filter(match);
    const filteredDurations = DURATIONS.filter(match);
    const filteredCompensation = COMPENSATION_TYPES.filter(match);
    const filteredWorkTypes = WORK_TYPES.filter(match);

    return (
        <div className="space-y-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100" style={{ fontFamily: 'var(--font-display)' }}>
                    Filters
                </h3>
                {count > 0 && (
                    <button
                        onClick={clearFilters}
                        className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Search filters */}
            <div className="relative mb-4">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search filters..."
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-300 dark:focus:border-blue-700 transition-all"
                />
            </div>

            {/* Active filter tags */}
            <AnimatePresence>
                {activeTags.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-wrap gap-1.5 mb-4 overflow-hidden"
                    >
                        {activeTags.map(({ key, value }) => (
                            <FilterTag
                                key={`${key}-${value}`}
                                label={value}
                                onRemove={() => toggleFilter(key as any, value)}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Field ── */}
            {filteredFields.length > 0 && (
                <FilterSection title="Field">
                    <div className="space-y-0.5 max-h-[200px] overflow-y-auto pr-1">
                        {filteredFields.map((f) => (
                            <FilterCheckbox
                                key={f}
                                label={f}
                                checked={(filters.field as string[]).includes(f)}
                                onToggle={() => toggleFilter('field', f)}
                            />
                        ))}
                    </div>
                </FilterSection>
            )}

            {/* ── Location (hierarchical) ── */}
            <FilterSection title="Location">
                <LocationFilter filterSearch={filterSearch} />
            </FilterSection>

            {/* ── Duration ── */}
            {!hideDuration && filteredDurations.length > 0 && (
                <FilterSection title="Duration">
                    <div className="space-y-0.5">
                        {filteredDurations.map((d) => (
                            <FilterCheckbox
                                key={d}
                                label={d}
                                checked={(filters.duration as string[]).includes(d)}
                                onToggle={() => toggleFilter('duration', d)}
                            />
                        ))}
                    </div>
                </FilterSection>
            )}

            {/* ── Compensation ── */}
            {filteredCompensation.length > 0 && (
                <FilterSection title="Compensation" defaultOpen={false}>
                    <div className="space-y-0.5">
                        {filteredCompensation.map((c) => (
                            <FilterCheckbox
                                key={c}
                                label={c.charAt(0).toUpperCase() + c.slice(1)}
                                checked={(filters.compensation as string[]).includes(c)}
                                onToggle={() => toggleFilter('compensation', c)}
                            />
                        ))}
                    </div>
                </FilterSection>
            )}

            {/* ── Work Type ── */}
            {filteredWorkTypes.length > 0 && (
                <FilterSection title="Work Type" defaultOpen={false}>
                    <div className="space-y-0.5">
                        {filteredWorkTypes.map((w) => (
                            <FilterCheckbox
                                key={w}
                                label={w.charAt(0).toUpperCase() + w.slice(1)}
                                checked={(filters.workType as string[]).includes(w)}
                                onToggle={() => toggleFilter('workType', w)}
                            />
                        ))}
                    </div>
                </FilterSection>
            )}
        </div>
    );
}
