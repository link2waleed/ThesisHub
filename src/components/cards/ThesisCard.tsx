import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin,
    Clock,
    Bookmark,
    ExternalLink,
    Building2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Thesis } from '@/types';
import { useBookmarkStore } from '@/stores';

interface ThesisCardProps {
    thesis: Thesis;
    featured?: boolean;
}

function getCompensationColor(comp: string) {
    switch (comp) {
        case 'paid': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400';
        case 'stipend': return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400';
        default: return 'bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400';
    }
}

function getTypeIcon(type: string) {
    switch (type) {
        case 'remote': return '🌐';
        case 'hybrid': return '🔄';
        default: return '🏢';
    }
}

function timeAgo(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff} days ago`;
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    return `${Math.floor(diff / 30)} months ago`;
}

export function ThesisCard({ thesis, featured }: ThesisCardProps) {
    const { toggleThesis, isThesisSaved } = useBookmarkStore();
    const saved = isThesisSaved(thesis.id);

    return (
        <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={featured ? 'card-featured' : 'card-elevated'}
        >
            <div className="p-5 sm:p-6">
                {/* 1. Logo + Org + Bookmark */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg border border-border/50 bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                            {thesis.organization.logo ? (
                                <img
                                    src={thesis.organization.logo}
                                    alt={thesis.organization.name}
                                    className="w-8 h-8 object-contain"
                                    loading="lazy"
                                />
                            ) : (
                                <Building2 className="w-5 h-5 text-muted-foreground" />
                            )}
                        </div>
                        <div className="min-w-0">
                            {/* 3. Organization name */}
                            <p className="text-sm font-medium text-muted-foreground truncate">
                                {thesis.organization.name}
                            </p>
                            <p className="text-xs text-muted-foreground/70">
                                {timeAgo(thesis.postedAt)}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleThesis(thesis.id);
                        }}
                        className={`shrink-0 p-1.5 rounded-md transition-colors duration-150 ${saved
                            ? 'text-primary bg-primary/10'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                            }`}
                        aria-label={saved ? 'Remove from bookmarks' : 'Save to bookmarks'}
                    >
                        <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* 2. Title */}
                <Link to={`/thesis/${thesis.id}`}>
                    <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors duration-150 leading-snug">
                        {thesis.title}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {thesis.shortDescription}
                </p>

                {/* 4. Metadata */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {thesis.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {thesis.duration}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        {getTypeIcon(thesis.type)} {thesis.type}
                    </span>
                </div>

                {/* 5. Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    <Badge variant="secondary" className="text-xs font-normal">
                        {thesis.field}
                    </Badge>
                    <Badge
                        className={`text-xs font-normal border-0 ${getCompensationColor(thesis.compensation)}`}
                    >
                        {thesis.compensation}
                    </Badge>
                    {thesis.tags.slice(0, 2).map((tag) => (
                        <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs font-normal text-muted-foreground"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* 6. CTA */}
                <div className="flex items-center gap-2 pt-1">
                    <Link to={`/thesis/${thesis.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full text-sm">
                            View Details
                        </Button>
                    </Link>
                    <a
                        href={thesis.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button size="sm" className="gap-1.5 text-sm shadow-sm">
                            Apply <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
