import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin,
    Clock,
    Building2,
    ExternalLink,
    Bookmark,
    ChevronRight,
    Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { InternshipCard } from '@/components/cards/InternshipCard';
import { Container } from '@/components/layout/Container';
import { internships } from '@/data/internships';
import { useBookmarkStore } from '@/stores';

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

export default function InternshipDetail() {
    const { id } = useParams<{ id: string }>();
    const internship = internships.find((i) => i.id === id);
    const { toggleInternship, isInternshipSaved } = useBookmarkStore();

    if (!internship) {
        return (
            <Container className="py-16 md:py-20 lg:py-24 text-center">
                <h2 className="text-2xl font-bold mb-4">Internship Not Found</h2>
                <p className="text-muted-foreground mb-6">The internship you're looking for doesn't exist or has been removed.</p>
                <Link to="/internships">
                    <Button>Back to Internships</Button>
                </Link>
            </Container>
        );
    }

    const saved = isInternshipSaved(internship.id);
    const related = internships.filter((i) => i.id !== internship.id && i.field === internship.field).slice(0, 3);

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="border-b border-border/50">
                <Container className="py-4">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/internships" className="hover:text-foreground transition-colors">
                            Internships
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-foreground truncate max-w-xs">{internship.title}</span>
                    </nav>
                </Container>
            </div>

            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
                <Container className="py-10 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <motion.div variants={fadeUp}>
                                {/* Company */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg border border-border/50 bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                        {internship.companyLogo ? (
                                            <img src={internship.companyLogo} alt={internship.company} className="w-9 h-9 object-contain" />
                                        ) : (
                                            <Building2 className="w-6 h-6 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            {internship.company}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Company</p>
                                    </div>
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                                    {internship.title}
                                </h1>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <Badge variant="secondary">{internship.field}</Badge>
                                    <Badge variant="outline">{internship.employmentType}</Badge>
                                    {internship.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-muted-foreground">{tag}</Badge>
                                    ))}
                                </div>
                            </motion.div>

                            <Separator className="my-6" />

                            {/* Description */}
                            <motion.div variants={fadeUp}>
                                <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>About This Internship</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {internship.description}
                                </p>
                            </motion.div>

                            {/* Requirements */}
                            {internship.requirements && internship.requirements.length > 0 && (
                                <motion.div variants={fadeUp} className="mt-8">
                                    <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>Requirements</h3>
                                    <ul className="space-y-2">
                                        {internship.requirements.map((req, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                                                {req}
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
                                    <a href={internship.applyUrl} target="_blank" rel="noopener noreferrer" className="block">
                                        <Button className="w-full gap-2 shadow-sm mb-3 rounded-xl" size="lg">
                                            Apply Now <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </a>
                                    <Button
                                        variant="outline"
                                        className="w-full gap-2"
                                        onClick={() => toggleInternship(internship.id)}
                                    >
                                        <Bookmark className={`w-4 h-4 ${saved ? 'fill-current text-primary' : ''}`} />
                                        {saved ? 'Saved' : 'Save Internship'}
                                    </Button>
                                </div>

                                {/* Details Card */}
                                <div className="card-elevated p-6 space-y-4">
                                    <h4 className="text-sm font-semibold">Details</h4>
                                    <div className="space-y-3">
                                        {[
                                            { icon: MapPin, label: 'Location', value: internship.location },
                                            { icon: Clock, label: 'Duration', value: internship.duration },
                                            { icon: Briefcase, label: 'Type', value: internship.employmentType },
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

                                {/* Company Card */}
                                <div className="card-elevated p-6">
                                    <h4 className="text-sm font-semibold mb-3">About {internship.company}</h4>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg border border-border/50 bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                            {internship.companyLogo ? (
                                                <img src={internship.companyLogo} alt={internship.company} className="w-7 h-7 object-contain" />
                                            ) : (
                                                <Building2 className="w-5 h-5 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{internship.company}</p>
                                            <p className="text-xs text-muted-foreground">{internship.location}</p>
                                        </div>
                                    </div>
                                    <a
                                        href={internship.applyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button variant="ghost" size="sm" className="text-xs gap-1 p-0 h-auto text-primary">
                                            Visit Careers Page <ChevronRight className="w-3 h-3" />
                                        </Button>
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </Container>

                {/* Related */}
                {related.length > 0 && (
                    <div className="border-t border-border/50">
                        <Container className="py-16 md:py-20 lg:py-24">
                            <motion.div variants={fadeUp}>
                                <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                                    Related Internships
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {related.map((i) => (
                                        <InternshipCard key={i.id} internship={i} />
                                    ))}
                                </div>
                            </motion.div>
                        </Container>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
