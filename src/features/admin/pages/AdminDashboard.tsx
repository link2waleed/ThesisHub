import { BookOpen, Briefcase, Users, Building2, GraduationCap, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard } from '../components/StatCard';
import { StatusBadge, AdminPostedBadge } from '../components/StatusBadge';
import { dashboardStats, adminTheses, adminUsers } from '@/data/adminData';

export default function AdminDashboard() {
    const recentTheses = adminTheses.slice(0, 5);
    const recentUsers = adminUsers.slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50" style={{ fontFamily: 'var(--font-display)' }}>Dashboard</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Overview of your ThesisHub platform</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard label="Total Thesis" value={dashboardStats.totalThesis} icon={BookOpen} color="slate" trend="+12% this month" />
                <StatCard label="Total Internships" value={dashboardStats.totalInternships} icon={Briefcase} color="emerald" trend="+8% this month" />
                <StatCard label="Students" value={dashboardStats.totalStudents} icon={GraduationCap} color="violet" trend="+340 this week" />
                <StatCard label="Companies" value={dashboardStats.totalCompanies} icon={Building2} color="amber" />
                <StatCard label="Universities" value={dashboardStats.totalUniversities} icon={Users} color="slate" />
                <StatCard label="Pending Approvals" value={dashboardStats.pendingApprovals} icon={ShieldCheck} color="rose" />
            </div>

            {/* Two-column activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent Thesis */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Recent Thesis</h3>
                        <Link to="/admin/thesis" className="text-xs text-slate-600 dark:text-slate-400 hover:underline flex items-center gap-0.5">
                            View all <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                        {recentTheses.map((t) => (
                            <div key={t.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{t.title}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{t.organization} · {t.createdAt}</p>
                                </div>
                                <div className="flex items-center gap-2 ml-3 shrink-0">
                                    {t.createdBy === 'admin' && <AdminPostedBadge />}
                                    <StatusBadge status={t.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Users */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Recent Users</h3>
                        <Link to="/admin/users" className="text-xs text-slate-600 dark:text-slate-400 hover:underline flex items-center gap-0.5">
                            View all <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                        {recentUsers.map((u) => (
                            <div key={u.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                                        {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{u.name}</p>
                                        <p className="text-xs text-slate-400">{u.email}</p>
                                    </div>
                                </div>
                                <StatusBadge status={u.role} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
