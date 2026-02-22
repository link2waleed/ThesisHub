import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronRight,
    GraduationCap,
    Lightbulb,
    Heart,
    TrendingUp,
    Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { IdeaCard } from '@/components/cards/IdeaCard';
import { thesisIdeas } from '@/data/mockData';
import { useBookmarkStore } from '@/stores';

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

function getFundingBadge(interest: string) {
    switch (interest) {
        case 'seeking': return { label: 'Seeking Funding', color: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400' };
        case 'open': return { label: 'Open to Funding', color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' };
        default: return { label: 'Self-Funded', color: 'bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400' };
    }
}

export default function IdeaDetail() {
    const { id } = useParams<{ id: string }>();
    const idea = thesisIdeas.find((i) => i.id === id);
    const { toggleIdea, isIdeaSaved } = useBookmarkStore();

    if (!idea) {
        return (
            <div className="container-wide section-padding text-center">
                <h2 className="text-2xl font-bold mb-4">Idea Not Found</h2>
                <p className="text-muted-foreground mb-6">This thesis idea doesn't exist or has been removed.</p>
                <Link to="/ideas"><Button>Back to Ideas</Button></Link>
            </div>
        );
    }

    const saved = isIdeaSaved(idea.id);
    const funding = getFundingBadge(idea.fundingInterest);
    const related = thesisIdeas.filter((i) => i.id !== idea.id && i.field === idea.field).slice(0, 3);

    return (
        <div className="min-h-screen">
            <div className="border-b border-border/50 bg-card/50">
                <div className="container-wide py-4">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/ideas" className="hover:text-foreground transition-colors">Ideas</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-foreground truncate max-w-xs">{idea.title}</span>
                    </nav>
                </div>
            </div>

            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
                <div className="container-wide py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        <div className="lg:col-span-2">
                            <motion.div variants={fadeUp}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                                        <Lightbulb className="w-6 h-6" />
                                    </div>
                                    <Badge className={`text-xs border-0 ${funding.color}`}>{funding.label}</Badge>
                                </div>

                                <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                                    {idea.title}
                                </h1>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <Badge variant="secondary">{idea.field}</Badge>
                                    {idea.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-muted-foreground">{tag}</Badge>
                                    ))}
                                </div>
                            </motion.div>

                            <Separator className="my-6" />

                            <motion.div variants={fadeUp}>
                                <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>Abstract</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {idea.abstract}
                                </p>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-1">
                            <motion.div variants={fadeUp} className="sticky top-24 space-y-4">
                                <div className="card-elevated p-6 space-y-3">
                                    <Button
                                        className="w-full gap-2 shadow-sm"
                                        onClick={() => toggleIdea(idea.id)}
                                    >
                                        <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                                        {saved ? 'Saved' : 'Save Idea'}
                                    </Button>
                                    <Button variant="outline" className="w-full gap-2">
                                        <Share2 className="w-4 h-4" /> Share
                                    </Button>
                                </div>

                                <div className="card-elevated p-6">
                                    <h4 className="text-sm font-semibold mb-3">Posted By</h4>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{idea.author.name}</p>
                                            <p className="text-xs text-muted-foreground">{idea.author.university}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-elevated p-6 space-y-3">
                                    <h4 className="text-sm font-semibold">Stats</h4>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> Interest</span>
                                        <span className="font-medium">{idea.likes || 0} saves</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {related.length > 0 && (
                    <div className="border-t border-border/50 bg-card/30">
                        <div className="container-wide section-padding">
                            <motion.div variants={fadeUp}>
                                <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>Related Ideas</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {related.map((i) => <IdeaCard key={i.id} idea={i} />)}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
