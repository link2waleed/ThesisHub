import { motion } from 'framer-motion';
import {
    FileText,
    Users,
    TrendingUp,
    Plus,
    Building2,
    Star,
    Clock,
    ArrowRight,
    BarChart3,
    DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const companyStats = [
    { label: 'Active Positions', value: 8, change: '+2 this month', icon: FileText, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Total Applicants', value: 64, change: '+15 this week', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Avg. Time to Fill', value: '18d', change: '-3 days', icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Hired This Year', value: 12, change: 'On track', icon: Star, color: 'text-violet-600 bg-violet-50' },
];

const topCandidates = [
    { name: 'Emma Johansson', field: 'Machine Learning', university: 'KTH', match: 95 },
    { name: 'Oskar Berg', field: 'Data Science', university: 'Chalmers', match: 91 },
    { name: 'Lina Svensson', field: 'Computer Science', university: 'Lund University', match: 88 },
    { name: 'Marcus Nilsson', field: 'AI Engineering', university: 'Uppsala', match: 85 },
];

const pipelineStages = [
    { stage: 'Applied', count: 36, color: 'bg-gray-200' },
    { stage: 'Screening', count: 16, color: 'bg-amber-200' },
    { stage: 'Interview', count: 8, color: 'bg-blue-200' },
    { stage: 'Offer', count: 3, color: 'bg-emerald-200' },
    { stage: 'Hired', count: 1, color: 'bg-primary/30' },
];

const totalPipeline = pipelineStages.reduce((acc, s) => acc + s.count, 0);

export default function CompanyDashboard() {
    return (
        <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {companyStats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="rounded-xl bg-card border border-border/50 shadow-sm p-4"
                    >
                        <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                            <stat.icon className="w-4.5 h-4.5" />
                        </div>
                        <p className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                        <p className="text-[11px] text-primary mt-1">{stat.change}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-2">
                <Button size="sm" className="gap-1.5 text-xs shadow-sm">
                    <Plus className="w-3.5 h-3.5" />Post Thesis Position
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <BarChart3 className="w-3.5 h-3.5" />Hiring Analytics
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Building2 className="w-3.5 h-3.5" />Company Profile
                </Button>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Pipeline + Candidates */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Hiring pipeline */}
                    <div className="rounded-xl bg-card border border-border/50 shadow-sm p-5">
                        <h2 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>Hiring Pipeline</h2>
                        <div className="flex rounded-lg overflow-hidden h-8 mb-4">
                            {pipelineStages.map((s) => (
                                <div
                                    key={s.stage}
                                    className={`${s.color} flex items-center justify-center text-[10px] font-medium text-foreground/70 transition-all`}
                                    style={{ width: `${(s.count / totalPipeline) * 100}%`, minWidth: '2rem' }}
                                    title={`${s.stage}: ${s.count}`}
                                >
                                    {s.count}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {pipelineStages.map((s) => (
                                <div key={s.stage} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                    <div className={`w-2.5 h-2.5 rounded-sm ${s.color}`} />
                                    {s.stage} ({s.count})
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top matched candidates */}
                    <div className="rounded-xl bg-card border border-border/50 shadow-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Top Matched Candidates</h2>
                            <Button variant="ghost" size="sm" className="text-xs text-primary gap-1">
                                View all <ArrowRight className="w-3 h-3" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {topCandidates.map((c) => (
                                <div key={c.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/30 transition-colors">
                                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                                        {c.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground">{c.name}</p>
                                        <p className="text-xs text-muted-foreground">{c.field} · {c.university}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <div className="w-10 h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.match}%` }} />
                                        </div>
                                        <span className="text-[11px] font-semibold text-emerald-600">{c.match}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Activity */}
                <div className="lg:col-span-2 rounded-xl bg-card border border-border/50 shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>Quick Insights</h2>
                    <div className="space-y-4">
                        {[
                            { icon: TrendingUp, label: 'Application rate', value: '+23%', desc: 'vs. last month', color: 'text-emerald-600' },
                            { icon: Clock, label: 'Avg. review time', value: '2.4 days', desc: 'Industry avg: 5 days', color: 'text-blue-600' },
                            { icon: Star, label: 'Candidate satisfaction', value: '4.8/5', desc: 'Based on 28 reviews', color: 'text-amber-600' },
                            { icon: DollarSign, label: 'Cost per hire', value: '€240', desc: 'Below budget by 20%', color: 'text-violet-600' },
                        ].map(insight => {
                            const ItemIcon = insight.icon;
                            return (
                                <div key={insight.label} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                        <ItemIcon className={`w-4 h-4 ${insight.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">{insight.label}</p>
                                        <p className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>{insight.value}</p>
                                        <p className="text-[11px] text-muted-foreground">{insight.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
