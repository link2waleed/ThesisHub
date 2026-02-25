import { Link } from 'react-router-dom';
import {
    MapPin,
    Clock,
    Bookmark,
    ArrowUpRight,
    Building2,
} from 'lucide-react';
import type { GraduateInternship } from '@/types';
import { useBookmarkStore } from '@/stores';

interface InternshipCardProps {
    internship: GraduateInternship;
    featured?: boolean;
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

export function InternshipCard({ internship }: InternshipCardProps) {
    const { toggleInternship, isInternshipSaved } = useBookmarkStore();
    const saved = isInternshipSaved(internship.id);

    return (
        <Link to={`/internships/${internship.id}`} className="block h-full">
            <div
                className="
                    group relative h-full flex flex-col
                    rounded-xl
                    border border-slate-200/60 dark:border-slate-700/50
                    bg-white dark:bg-slate-900/80
                    p-5 sm:p-6
                    transition-all duration-200 ease-out
                    hover:border-slate-300 dark:hover:border-slate-600
                    hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.25)]
                    hover:-translate-y-[2px]
                "
            >
                {/* Space-y container for uniform rhythm */}
                <div className="flex flex-col flex-1 space-y-4">

                    {/* 1. Logo + Company + Bookmark */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                                {internship.companyLogo ? (
                                    <img
                                        src={internship.companyLogo}
                                        alt={internship.company}
                                        className="w-7 h-7 object-contain"
                                        loading="lazy"
                                    />
                                ) : (
                                    <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                                    {internship.company}
                                </p>
                                <p className="text-xs text-slate-400 dark:text-slate-500">
                                    {timeAgo(internship.postedAt)}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                toggleInternship(internship.id);
                            }}
                            className={`shrink-0 p-1.5 rounded-md transition-colors duration-150 ${saved
                                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                            aria-label={saved ? 'Remove from bookmarks' : 'Save to bookmarks'}
                        >
                            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                        </button>
                    </div>

                    {/* 2. Title — dominant visual element */}
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {internship.title}
                    </h3>

                    {/* 3. Description — flex-1 pushes bottom content down */}
                    <p className="flex-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {internship.description.split('\n')[0]}
                    </p>

                    {/* 4. Metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-[13px] text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {internship.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {internship.duration}
                        </span>
                        <span className="inline-flex items-center gap-1 capitalize">
                            {internship.employmentType}
                        </span>
                    </div>

                    {/* 5. Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {internship.field}
                        </span>
                        {internship.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 6. CTA — pinned to bottom, revealed on hover */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                    <span
                        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1"
                    >
                        View details <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    <a
                        href={internship.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1"
                    >
                        Apply directly <ArrowUpRight className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </Link>
    );
}
