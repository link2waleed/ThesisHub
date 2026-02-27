import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    color?: 'blue' | 'emerald' | 'violet' | 'amber' | 'rose' | 'slate';
}

const colorMap = {
    blue: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
    violet: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400',
    amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
    rose: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400',
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
};

export function StatCard({ label, value, icon: Icon, trend, color = 'slate' }: StatCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 transition-shadow hover:shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-50" style={{ fontFamily: 'var(--font-display)' }}>
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </p>
                    {trend && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">{trend}</p>
                    )}
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}
