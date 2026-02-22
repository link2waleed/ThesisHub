import { motion } from 'framer-motion';
import {
    FileText,
    Users,
    Eye,
    Plus,
    GraduationCap,
    BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const uniStats = [
    { label: 'Posted Theses', value: 45, change: '+5 this month', icon: FileText, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Active Applications', value: 128, change: '+23 this week', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Profile Views', value: '2.4K', change: '+18%', icon: Eye, color: 'text-amber-600 bg-amber-50' },
    { label: 'Accepted Students', value: 34, change: 'This academic year', icon: GraduationCap, color: 'text-violet-600 bg-violet-50' },
];

const recentApplications = [
    { student: 'Emma Johansson', thesis: 'ML in Autonomous Systems', field: 'Computer Science', date: '1 hour ago', status: 'New' },
    { student: 'Oskar Berg', thesis: 'Sustainable Energy Grid', field: 'Environmental Eng.', date: '3 hours ago', status: 'New' },
    { student: 'Lina Svensson', thesis: 'NLP for Swedish Healthcare', field: 'Data Science', date: '6 hours ago', status: 'Reviewed' },
    { student: 'Marcus Nilsson', thesis: 'Quantum Computing Algorithms', field: 'Physics', date: '1 day ago', status: 'Shortlisted' },
    { student: 'Sara Appelqvist', thesis: 'Blockchain Supply Chain', field: 'Computer Science', date: '1 day ago', status: 'Reviewed' },
];

const topTheses = [
    { title: 'AI-Powered Network Optimization', applications: 34, views: 890, status: 'Active' },
    { title: 'Sustainable Urban Planning Models', applications: 28, views: 650, status: 'Active' },
    { title: 'Blockchain for Supply Chain', applications: 22, views: 540, status: 'Active' },
];

export default function UniversityDashboard() {
    return (
        <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {uniStats.map((stat, i) => (
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
                    <Plus className="w-3.5 h-3.5" />Post New Thesis
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <BarChart3 className="w-3.5 h-3.5" />View Analytics
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Users className="w-3.5 h-3.5" />Browse Students
                </Button>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Recent applications */}
                <div className="lg:col-span-3 rounded-xl bg-card border border-border/50 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Recent Applications</h2>
                        <Badge variant="secondary" className="text-[10px]">{recentApplications.filter(a => a.status === 'New').length} new</Badge>
                    </div>
                    <div className="space-y-2">
                        {recentApplications.map((app) => (
                            <div key={`${app.student}-${app.thesis}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/30 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                                    {app.student.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground">{app.student}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">{app.thesis} · {app.field}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${app.status === 'New' ? 'bg-emerald-100 text-emerald-700' :
                                        app.status === 'Shortlisted' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>{app.status}</span>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">{app.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top performing theses */}
                <div className="lg:col-span-2 rounded-xl bg-card border border-border/50 shadow-sm p-5">
                    <h2 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>Top Performing Theses</h2>
                    <div className="space-y-3">
                        {topTheses.map((t, i) => (
                            <div key={t.title} className="p-3 rounded-lg bg-accent/20 border border-border/30">
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="text-xs font-bold text-primary bg-primary/10 w-5 h-5 rounded-full flex items-center justify-center shrink-0">{i + 1}</span>
                                    <p className="text-sm font-medium text-foreground line-clamp-2">{t.title}</p>
                                </div>
                                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{t.applications} apps</span>
                                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{t.views} views</span>
                                    <Badge variant="outline" className="text-[9px] h-4">{t.status}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
