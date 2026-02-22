import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bookmark,
    Trash2,
    Building2,
    MapPin,
    Lightbulb,
    ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SavedItem {
    id: string;
    type: 'thesis' | 'idea';
    title: string;
    org: string;
    location: string;
    field: string;
    savedAt: string;
}

const initialBookmarks: SavedItem[] = [
    { id: '1', type: 'thesis', title: 'Machine Learning in Autonomous Vehicles', org: 'Volvo Group', location: 'Gothenburg', field: 'AI & ML', savedAt: '2 hours ago' },
    { id: '2', type: 'thesis', title: 'AI-Powered Network Optimization for 5G', org: 'Ericsson', location: 'Stockholm', field: 'Data Science', savedAt: '1 day ago' },
    { id: '3', type: 'idea', title: 'Federated Learning for Healthcare Data Privacy', org: 'Community', location: 'Stockholm', field: 'Machine Learning', savedAt: '2 days ago' },
    { id: '4', type: 'thesis', title: 'Sustainable Energy Systems Analysis', org: 'KTH', location: 'Stockholm', field: 'Environmental Science', savedAt: '3 days ago' },
    { id: '5', type: 'idea', title: 'Blockchain for Academic Credentials', org: 'Community', location: 'Global', field: 'Computer Science', savedAt: '4 days ago' },
    { id: '6', type: 'thesis', title: 'Human-Robot Interaction in Manufacturing', org: 'ABB', location: 'Västerås', field: 'Robotics', savedAt: '5 days ago' },
];

export default function BookmarksPage() {
    const [bookmarks, setBookmarks] = useState(initialBookmarks);
    const [filter, setFilter] = useState<'all' | 'thesis' | 'idea'>('all');

    const filtered = filter === 'all' ? bookmarks : bookmarks.filter((b) => b.type === filter);

    const removeBookmark = (id: string) => {
        setBookmarks((prev) => prev.filter((b) => b.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 lg:py-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                            <Bookmark className="w-6 h-6 text-primary" />
                            Saved Items
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">{bookmarks.length} items saved</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-1 p-1 rounded-lg bg-muted w-fit mb-6">
                    {(['all', 'thesis', 'idea'] as const).map((f) => {
                        const count = f === 'all' ? bookmarks.length : bookmarks.filter((b) => b.type === f).length;
                        return (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${filter === f ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {f === 'idea' ? 'Ideas' : f === 'thesis' ? 'Theses' : 'All'} ({count})
                            </button>
                        );
                    })}
                </div>

                {/* Bookmarks list */}
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="rounded-xl bg-card border border-border/50 shadow-sm p-4 sm:p-5 flex items-start gap-4"
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.type === 'thesis' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                    {item.type === 'thesis' ? <Building2 className="w-4.5 h-4.5" /> : <Lightbulb className="w-4.5 h-4.5" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <Link to={item.type === 'thesis' ? `/thesis/${item.id}` : `/ideas/${item.id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
                                                {item.title}
                                            </Link>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                                <span>{item.org}</span>
                                                <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{item.location}</span>
                                                <span>Saved {item.savedAt}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 shrink-0">
                                            <Badge variant={item.type === 'thesis' ? 'secondary' : 'outline'} className="text-[10px]">{item.field}</Badge>
                                            <Link to={item.type === 'thesis' ? `/thesis/${item.id}` : `/ideas/${item.id}`}>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeBookmark(item.id)}>
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filtered.length === 0 && (
                        <div className="py-16 text-center">
                            <Bookmark className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground">No saved {filter === 'all' ? 'items' : filter === 'thesis' ? 'theses' : 'ideas'} yet</p>
                            <Link to={filter === 'idea' ? '/ideas' : '/thesis'}>
                                <Button variant="outline" size="sm" className="mt-3 text-xs">Browse {filter === 'idea' ? 'ideas' : 'theses'}</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
