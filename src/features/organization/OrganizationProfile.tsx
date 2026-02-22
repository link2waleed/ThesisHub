import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Building2,
    MapPin,
    Globe,
    Users,
    FileText,
    Calendar,
    ExternalLink,
    ArrowLeft,
    Briefcase,
    GraduationCap,
    CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const orgData: Record<string, {
    name: string; type: 'university' | 'company'; tagline: string; description: string;
    location: string; website: string; founded: string; employees: string;
    thesesPosted: number; activeTheses: number; fields: string[];
}> = {
    'kth': {
        name: 'KTH Royal Institute of Technology', type: 'university',
        tagline: 'Leading technical university in Scandinavia',
        description: 'KTH Royal Institute of Technology is Sweden\'s largest and most respected technical university. With a strong focus on research and innovation, KTH collaborates extensively with industry partners to provide meaningful thesis opportunities in engineering, computer science, and sustainability.',
        location: 'Stockholm, Sweden', website: 'kth.se', founded: '1827',
        employees: '5,000+', thesesPosted: 234, activeTheses: 45,
        fields: ['Computer Science', 'Electrical Engineering', 'Machine Learning', 'Sustainability', 'Biotechnology'],
    },
    'ericsson': {
        name: 'Ericsson Research', type: 'company',
        tagline: 'Pioneering communications technology worldwide',
        description: 'Ericsson is a world leader in communications technology and services. Our thesis program offers students the chance to work on cutting-edge projects in 5G, AI-driven network optimization, IoT, and cloud infrastructure alongside world-class engineers.',
        location: 'Stockholm, Sweden', website: 'ericsson.com', founded: '1876',
        employees: '100,000+', thesesPosted: 89, activeTheses: 12,
        fields: ['5G Networks', 'AI & Machine Learning', 'Cloud Computing', 'IoT', 'Cybersecurity'],
    },
};

const sampleTheses = [
    { id: '1', title: 'AI-Powered Network Optimization for 5G', field: 'Data Science', type: 'Paid' },
    { id: '2', title: 'Sustainable Energy Grid Management', field: 'Environmental Science', type: 'Stipend' },
    { id: '3', title: 'Federated Learning for Healthcare Applications', field: 'Machine Learning', type: 'Paid' },
];

export default function OrganizationProfile() {
    const { id } = useParams();
    const org = orgData[id || ''] || orgData['kth'];
    const isUniversity = org.type === 'university';
    const Icon = isUniversity ? GraduationCap : Building2;

    return (
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 lg:py-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                {/* Back */}
                <Link to="/thesis" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to thesis feed
                </Link>

                {/* Header */}
                <div className="rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden mb-6">
                    <div className="h-32 sm:h-40 bg-gradient-to-r from-primary/20 via-primary/10 to-violet-500/10" />
                    <div className="px-6 pb-6 -mt-12">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-card border-4 border-background shadow-lg flex items-center justify-center text-primary">
                                <Icon className="w-10 h-10 sm:w-12 sm:h-12" />
                            </div>
                            <div className="flex-1 min-w-0 pt-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate" style={{ fontFamily: 'var(--font-display)' }}>
                                        {org.name}
                                    </h1>
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                </div>
                                <p className="text-sm text-muted-foreground">{org.tagline}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <a href={`https://${org.website}`} target="_blank" rel="noreferrer">
                                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                                        <ExternalLink className="w-3.5 h-3.5" />Website
                                    </Button>
                                </a>
                                <Button size="sm" className="text-xs shadow-sm">Follow</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About */}
                        <div className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                            <h2 className="text-sm font-semibold text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>About</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">{org.description}</p>
                        </div>

                        {/* Active theses */}
                        <div className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Active Thesis Opportunities</h2>
                                <Badge variant="secondary" className="text-[10px]">{org.activeTheses} open</Badge>
                            </div>
                            <div className="divide-y divide-border/40">
                                {sampleTheses.map((t) => (
                                    <Link key={t.id} to={`/thesis/${t.id}`} className="flex items-center justify-between py-3 hover:bg-accent/30 -mx-2 px-2 rounded-lg transition-colors">
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{t.title}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">{t.field}</p>
                                        </div>
                                        <Badge variant="outline" className="text-[10px] shrink-0">{t.type}</Badge>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Fields */}
                        <div className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                            <h2 className="text-sm font-semibold text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>Research Fields</h2>
                            <div className="flex flex-wrap gap-2">
                                {org.fields.map((f) => (
                                    <Badge key={f} variant="secondary" className="px-3 py-1 text-xs">{f}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {[
                            { icon: MapPin, label: 'Location', value: org.location },
                            { icon: Calendar, label: 'Founded', value: org.founded },
                            { icon: Users, label: isUniversity ? 'Staff' : 'Employees', value: org.employees },
                            { icon: FileText, label: 'Total theses posted', value: String(org.thesesPosted) },
                            { icon: Briefcase, label: 'Active opportunities', value: String(org.activeTheses) },
                            { icon: Globe, label: 'Website', value: org.website },
                        ].map((item) => {
                            const ItemIcon = item.icon;
                            return (
                                <div key={item.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border/50 shadow-sm">
                                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                        <ItemIcon className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] text-muted-foreground">{item.label}</p>
                                        <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
