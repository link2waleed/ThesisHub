import { analyticsData } from '@/data/adminData';
import { TrendingUp, Users, BookOpen, Briefcase } from 'lucide-react';

// Simple bar chart component (no library dependency)
function BarChart({ data, dataKey, color, height = 200 }: { data: { month: string;[key: string]: any }[]; dataKey: string; color: string; height?: number }) {
    const values = data.map((d) => d[dataKey] as number);
    const max = Math.max(...values);

    return (
        <div className="flex items-end gap-2" style={{ height }}>
            {data.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-slate-400 font-medium">{values[i].toLocaleString()}</span>
                    <div
                        className={`w-full rounded-t-md transition-all duration-500 ${color}`}
                        style={{ height: `${(values[i] / max) * 100}%`, minHeight: 4 }}
                    />
                    <span className="text-[10px] text-slate-500 font-medium">{d.month}</span>
                </div>
            ))}
        </div>
    );
}

function MultiBarChart({ data, height = 200 }: { data: { month: string; students: number; companies: number; universities: number }[]; height?: number }) {
    const allValues = data.flatMap((d) => [d.students, d.companies, d.universities]);
    const max = Math.max(...allValues);

    return (
        <div className="flex items-end gap-3" style={{ height }}>
            {data.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: height - 24 }}>
                        <div className="flex-1 bg-stone-400 rounded-t-sm" style={{ height: `${(d.students / max) * 100}%`, minHeight: 2 }} />
                        <div className="flex-1 bg-emerald-500 rounded-t-sm" style={{ height: `${(d.companies / max) * 100}%`, minHeight: 2 }} />
                        <div className="flex-1 bg-violet-500 rounded-t-sm" style={{ height: `${(d.universities / max) * 100}%`, minHeight: 2 }} />
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{d.month}</span>
                </div>
            ))}
        </div>
    );
}

export default function AdminAnalytics() {
    const latestUser = analyticsData.userGrowth[analyticsData.userGrowth.length - 1];
    const latestThesis = analyticsData.thesisPosted[analyticsData.thesisPosted.length - 1];
    const latestInternship = analyticsData.internshipPosted[analyticsData.internshipPosted.length - 1];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50" style={{ fontFamily: 'var(--font-display)' }}>Analytics</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Platform growth and engagement metrics</p>
            </div>

            {/* User Growth */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <Users className="w-4.5 h-4.5 text-slate-600 dark:text-slate-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">User Growth</h3>
                            <p className="text-xs text-slate-400">Total: {(latestUser.students + latestUser.companies + latestUser.universities).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-stone-400" /> Students</span>
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Companies</span>
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-violet-500" /> Universities</span>
                    </div>
                </div>
                <MultiBarChart data={analyticsData.userGrowth} height={220} />
            </div>

            {/* Thesis & Internship Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                            <BookOpen className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Thesis Posted</h3>
                            <p className="text-xs text-slate-400 flex items-center gap-1">
                                {latestThesis.count} in {latestThesis.month}
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                            </p>
                        </div>
                    </div>
                    <BarChart data={analyticsData.thesisPosted} dataKey="count" color="bg-emerald-500" />
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center">
                            <Briefcase className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Internships Posted</h3>
                            <p className="text-xs text-slate-400 flex items-center gap-1">
                                {latestInternship.count} in {latestInternship.month}
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                            </p>
                        </div>
                    </div>
                    <BarChart data={analyticsData.internshipPosted} dataKey="count" color="bg-amber-500" />
                </div>
            </div>
        </div>
    );
}
