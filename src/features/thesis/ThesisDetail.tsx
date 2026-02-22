import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {

    MapPin,
    Clock,
    Building2,
    ExternalLink,
    Bookmark,
    Calendar,
    Monitor,
    DollarSign,
    ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ThesisCard } from '@/components/cards/ThesisCard';
import { theses } from '@/data/mockData';
import { useBookmarkStore } from '@/stores';

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

export default function ThesisDetail() {
    const { id } = useParams<{ id: string }>();
    const thesis = theses.find((t) => t.id === id);
    const { toggleThesis, isThesisSaved } = useBookmarkStore();

    if (!thesis) {
        return (
            <div className="container-wide section-padding text-center">
                <h2 className="text-2xl font-bold mb-4">Thesis Not Found</h2>
                <p className="text-muted-foreground mb-6">The thesis you're looking for doesn't exist or has been removed.</p>
                <Link to="/thesis">
                    <Button>Back to Thesis Feed</Button>
                </Link>
            </div>
        );
    }

    const saved = isThesisSaved(thesis.id);
    const related = theses.filter((t) => t.id !== thesis.id && t.field === thesis.field).slice(0, 3);

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="border-b border-border/50 bg-card/50">
                <div className="container-wide py-4">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/thesis" className="hover:text-foreground transition-colors">
                            Thesis
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-foreground truncate max-w-xs">{thesis.title}</span>
                    </nav>
                </div>
            </div>

            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
                <div className="container-wide py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <motion.div variants={fadeUp}>
                                {/* Organization */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg border border-border/50 bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                        {thesis.organization.logo ? (
                                            <img src={thesis.organization.logo} alt={thesis.organization.name} className="w-9 h-9 object-contain" />
                                        ) : (
                                            <Building2 className="w-6 h-6 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div>
                                        <Link to={`/organization/${thesis.organization.id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                                            {thesis.organization.name}
                                        </Link>
                                        <p className="text-xs text-muted-foreground">{thesis.organization.type === 'university' ? 'University' : 'Company'}</p>
                                    </div>
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                                    {thesis.title}
                                </h1>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <Badge variant="secondary">{thesis.field}</Badge>
                                    <Badge variant={thesis.compensation === 'paid' ? 'default' : 'outline'}>
                                        {thesis.compensation}
                                    </Badge>
                                    {thesis.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-muted-foreground">{tag}</Badge>
                                    ))}
                                </div>
                            </motion.div>

                            <Separator className="my-6" />

                            {/* Description */}
                            <motion.div variants={fadeUp}>
                                <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>About This Thesis</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {thesis.description}
                                </p>
                            </motion.div>

                            {/* Requirements */}
                            {thesis.requirements && thesis.requirements.length > 0 && (
                                <motion.div variants={fadeUp} className="mt-8">
                                    <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>Requirements</h3>
                                    <ul className="space-y-2">
                                        {thesis.requirements.map((req, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Responsibilities */}
                            {thesis.responsibilities && thesis.responsibilities.length > 0 && (
                                <motion.div variants={fadeUp} className="mt-8">
                                    <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>What You'll Do</h3>
                                    <ul className="space-y-2">
                                        {thesis.responsibilities.map((resp, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                                                {resp}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <motion.div variants={fadeUp} className="sticky top-24 space-y-4">
                                {/* Action Card */}
                                <div className="card-elevated p-6">
                                    <a href={thesis.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
                                        <Button className="w-full gap-2 shadow-sm mb-3" size="lg">
                                            Apply Now <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </a>
                                    <Button
                                        variant="outline"
                                        className="w-full gap-2"
                                        onClick={() => toggleThesis(thesis.id)}
                                    >
                                        <Bookmark className={`w-4 h-4 ${saved ? 'fill-current text-primary' : ''}`} />
                                        {saved ? 'Saved' : 'Save Thesis'}
                                    </Button>
                                </div>

                                {/* Details Card */}
                                <div className="card-elevated p-6 space-y-4">
                                    <h4 className="text-sm font-semibold">Details</h4>
                                    <div className="space-y-3">
                                        {[
                                            { icon: MapPin, label: 'Location', value: thesis.location },
                                            { icon: Clock, label: 'Duration', value: thesis.duration },
                                            { icon: Monitor, label: 'Type', value: thesis.type },
                                            { icon: DollarSign, label: 'Compensation', value: thesis.compensation },
                                            ...(thesis.deadline ? [{ icon: Calendar, label: 'Deadline', value: thesis.deadline }] : []),
                                        ].map(({ icon: Icon, label, value }) => (
                                            <div key={label} className="flex items-center justify-between">
                                                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Icon className="w-4 h-4" /> {label}
                                                </span>
                                                <span className="text-sm font-medium capitalize">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Organization Card */}
                                <div className="card-elevated p-6">
                                    <h4 className="text-sm font-semibold mb-3">About {thesis.organization.name}</h4>
                                    <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
                                        {thesis.organization.description}
                                    </p>
                                    <Link to={`/organization/${thesis.organization.id}`}>
                                        <Button variant="ghost" size="sm" className="text-xs gap-1 p-0 h-auto text-primary">
                                            View Organization <ChevronRight className="w-3 h-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Related */}
                {related.length > 0 && (
                    <div className="border-t border-border/50 bg-card/30">
                        <div className="container-wide section-padding">
                            <motion.div variants={fadeUp}>
                                <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                                    Related Thesis
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {related.map((t) => (
                                        <ThesisCard key={t.id} thesis={t} />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
