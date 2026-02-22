import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Lightbulb, GraduationCap, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ThesisIdea } from '@/types';
import { useBookmarkStore } from '@/stores';

interface IdeaCardProps {
    idea: ThesisIdea;
    featured?: boolean;
}

function getFundingBadge(interest: string) {
    switch (interest) {
        case 'seeking':
            return { label: 'Seeking Funding', className: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400' };
        case 'open':
            return { label: 'Open to Funding', className: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' };
        default:
            return { label: 'Self-Funded', className: 'bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400' };
    }
}

export function IdeaCard({ idea, featured }: IdeaCardProps) {
    const { toggleIdea, isIdeaSaved } = useBookmarkStore();
    const saved = isIdeaSaved(idea.id);
    const funding = getFundingBadge(idea.fundingInterest);

    return (
        <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={featured ? 'card-featured' : 'card-elevated'}
        >
            <div className="p-5 sm:p-6">
                {/* Header: Icon + Funding Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/5 text-primary shrink-0">
                        <Lightbulb className="w-5 h-5" />
                    </div>
                    <Badge className={`text-xs font-normal border-0 shrink-0 ${funding.className}`}>
                        {funding.label}
                    </Badge>
                </div>

                {/* Title */}
                <Link to={`/ideas/${idea.id}`}>
                    <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors duration-150 leading-snug">
                        {idea.title}
                    </h3>
                </Link>

                {/* Abstract */}
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                    {idea.shortAbstract}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    <Badge variant="secondary" className="text-xs font-normal">
                        {idea.field}
                    </Badge>
                    {idea.tags.slice(0, 2).map((tag) => (
                        <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs font-normal text-muted-foreground"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* Author + Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <GraduationCap className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">
                                {idea.author.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">
                                {idea.author.university}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {idea.likes !== undefined && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {idea.likes}
                            </span>
                        )}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                toggleIdea(idea.id);
                            }}
                            className={`p-1.5 rounded-md transition-colors duration-150 ${saved
                                ? 'text-rose-500 bg-rose-50 dark:bg-rose-950'
                                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                }`}
                            aria-label={saved ? 'Unsave idea' : 'Save idea'}
                        >
                            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
