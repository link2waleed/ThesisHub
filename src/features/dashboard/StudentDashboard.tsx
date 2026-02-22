import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Briefcase,
    GraduationCap,
    ArrowRight,
    Lightbulb,
    Target,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const studentStats = [
    { label: 'Saved Theses', value: 12, change: '+3 this week', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Applications', value: 4, change: '2 pending', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Ideas Published', value: 3, change: '45 likes', icon: Lightbulb, color: 'text-amber-600 bg-amber-50' },
    { label: 'Profile Score', value: '78%', change: '+5% this month', icon: Target, color: 'text-violet-600 bg-violet-50' },
];

const applicationTimeline = [
    { org: 'Ericsson Research', thesis: 'AI-Powered Network Optimization', status: 'Under Review', date: '2 days ago', statusColor: 'bg-amber-100 text-amber-700' },
    { org: 'Volvo Group', thesis: 'Autonomous Vehicle Safety Systems', status: 'Interview Scheduled', date: '5 days ago', statusColor: 'bg-blue-100 text-blue-700' },
    { org: 'KTH Research Lab', thesis: 'Federated ML in Healthcare', status: 'Submitted', date: '1 week ago', statusColor: 'bg-gray-100 text-gray-700' },
    { org: 'Spotify', thesis: 'Music Recommendation ML Pipeline', status: 'Accepted', date: '2 weeks ago', statusColor: 'bg-emerald-100 text-emerald-700' },
];

const suggestedActions = [
    { icon: GraduationCap, title: 'Complete your profile', desc: 'Add research interests to get better matches', action: '/dashboard/profile', progress: 78 },
    { icon: BookOpen, title: 'Explore new theses', desc: '12 new opportunities match your profile', action: '/thesis', progress: null },
    { icon: Lightbulb, title: 'Share a thesis idea', desc: 'Get feedback from the community', action: '/ideas', progress: null },
];

export default function StudentDashboard() {
    return (
        <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {studentStats.map((stat, i) => (
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

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Application timeline */}
                <div className="lg:col-span-2 rounded-xl bg-card border border-border/50 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Application Timeline</h2>
                        <Badge variant="secondary" className="text-[10px]">{applicationTimeline.length} active</Badge>
                    </div>
                    <div className="space-y-3">
                        {applicationTimeline.map((app) => (
                            <div key={app.thesis} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/30 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground line-clamp-1">{app.thesis}</p>
                                    <p className="text-xs text-muted-foreground">{app.org}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${app.statusColor}`}>{app.status}</span>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">{app.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Suggested actions */}
                <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Suggested Actions</h2>
                    {suggestedActions.map((action) => (
                        <Link key={action.title} to={action.action} className="block rounded-xl bg-card border border-border/50 shadow-sm p-4 hover:border-primary/30 transition-colors group">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <action.icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{action.title}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{action.desc}</p>
                                    {action.progress && (
                                        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${action.progress}%` }} />
                                        </div>
                                    )}
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
