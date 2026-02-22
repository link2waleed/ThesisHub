import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Eye,
    Bookmark,
    FileText,
    TrendingUp,
    ArrowRight,
    Clock,
    Lightbulb,
    Building2,
    MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const stats = [
    { label: 'Saved Theses', value: '12', icon: Bookmark, change: '+3 this week', color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Applications', value: '4', icon: FileText, change: '2 pending', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Profile Views', value: '89', icon: Eye, change: '+24%', color: 'text-amber-600 bg-amber-50' },
    { label: 'Ideas Published', value: '3', icon: Lightbulb, change: '45 likes', color: 'text-violet-600 bg-violet-50' },
];

const recentActivity = [
    { type: 'save', text: 'Saved "Machine Learning in Autonomous Vehicles"', time: '2 hours ago', icon: Bookmark },
    { type: 'apply', text: 'Applied to thesis at Ericsson Research', time: '1 day ago', icon: FileText },
    { type: 'view', text: 'Your idea received 12 new views', time: '2 days ago', icon: TrendingUp },
    { type: 'save', text: 'Saved "Sustainable Energy Systems Analysis"', time: '3 days ago', icon: Bookmark },
];

const recommendations = [
    { id: '1', title: 'AI-Powered Network Optimization', org: 'Ericsson', location: 'Stockholm', type: 'Paid', field: 'Data Science & AI' },
    { id: '2', title: 'Sustainable Urban Planning Models', org: 'KTH Royal Institute', location: 'Stockholm', type: 'Stipend', field: 'Environmental Science' },
    { id: '3', title: 'Blockchain for Supply Chain', org: 'Volvo Group', location: 'Gothenburg', type: 'Paid', field: 'Computer Science' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' as const } }),
};

export default function DashboardOverview() {
    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    Welcome back, Demo 👋
                </h1>
                <p className="text-sm text-muted-foreground">
                    Here's what's happening with your thesis journey
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="p-4 rounded-xl bg-card border border-border/50 shadow-sm"
                        >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                                <Icon className="w-4.5 h-4.5" />
                            </div>
                            <p className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                            <p className="text-xs text-emerald-600 mt-1.5 font-medium">{stat.change}</p>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <div className="rounded-xl bg-card border border-border/50 shadow-sm">
                        <div className="flex items-center justify-between p-5 border-b border-border/50">
                            <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
                            <Clock className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="divide-y divide-border/40">
                            {recentActivity.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="flex items-start gap-3 px-5 py-3.5">
                                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                                            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm text-foreground leading-snug">{item.text}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Recommended Theses */}
                <div className="lg:col-span-3">
                    <div className="rounded-xl bg-card border border-border/50 shadow-sm">
                        <div className="flex items-center justify-between p-5 border-b border-border/50">
                            <h2 className="text-sm font-semibold text-foreground">Recommended for You</h2>
                            <Link to="/thesis">
                                <Button variant="ghost" size="sm" className="text-xs gap-1 text-primary h-7">
                                    View all <ArrowRight className="w-3 h-3" />
                                </Button>
                            </Link>
                        </div>
                        <div className="divide-y divide-border/40">
                            {recommendations.map((thesis) => (
                                <Link key={thesis.id} to={`/thesis/${thesis.id}`} className="flex items-start gap-4 px-5 py-4 hover:bg-accent/30 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                        <Building2 className="w-4.5 h-4.5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground mb-1 truncate">{thesis.title}</p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span>{thesis.org}</span>
                                            <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{thesis.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Badge variant="secondary" className="text-[10px]">{thesis.field}</Badge>
                                        <Badge variant="outline" className="text-[10px]">{thesis.type}</Badge>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
