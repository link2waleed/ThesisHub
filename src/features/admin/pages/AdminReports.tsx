import { useState } from 'react';
import { Trash2, XCircle, Eye } from 'lucide-react';
import { AdminTable, type Column } from '../components/AdminTable';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmModal } from '../components/AdminModal';
import { adminReports, type ReportItem } from '@/data/adminData';

export default function AdminReports() {
    const [data, setData] = useState(adminReports);

    const deleteReport = (id: string) => setData((d) => d.filter((r) => r.id !== id));
    const ignoreReport = (id: string) => setData((d) => d.map((r) => r.id === id ? { ...r, status: 'ignored' as const } : r));

    const [deleteTarget, setDeleteTarget] = useState<ReportItem | null>(null);

    const columns: Column<ReportItem>[] = [
        {
            key: 'type',
            label: 'Type',
            render: (row) => (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${row.type === 'user' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' :
                    row.type === 'thesis' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' :
                        'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                    }`}>
                    {row.type}
                </span>
            ),
        },
        {
            key: 'targetName',
            label: 'Target',
            sortable: true,
            render: (row) => <p className="text-sm font-medium text-slate-800 dark:text-slate-200 max-w-[200px] truncate">{row.targetName}</p>,
        },
        { key: 'reason', label: 'Reason', render: (row) => <span className="text-sm text-slate-500 max-w-[200px] truncate block">{row.reason}</span> },
        { key: 'reportedBy', label: 'Reported By', render: (row) => <span className="text-xs text-slate-400">{row.reportedBy}</span> },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
        { key: 'reportedAt', label: 'Date', sortable: true, render: (row) => <span className="text-xs text-slate-400">{row.reportedAt}</span> },
        {
            key: 'actions',
            label: '',
            className: 'text-right',
            render: (row) => row.status === 'pending' ? (
                <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); ignoreReport(row.id); }}
                        className="p-1.5 rounded-md hover:bg-amber-50 dark:hover:bg-amber-950/30 text-slate-400 hover:text-amber-600 transition-colors"
                    >
                        <XCircle className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setDeleteTarget(row); }}
                        className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-400 hover:text-red-600 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ) : null,
        },
    ];

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50" style={{ fontFamily: 'var(--font-display)' }}>Reports & Moderation</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review reported content and users</p>
            </div>

            <AdminTable columns={columns} data={data} emptyMessage="No reports to review" />

            <ConfirmModal
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={() => {
                    if (deleteTarget) deleteReport(deleteTarget.id);
                }}
                title="Delete Reported Content"
                description={`Are you sure you want to delete "${deleteTarget?.targetName}"? This will remove the reported content permanently.`}
                confirmLabel="Delete"
                variant="danger"
            />
        </div>
    );
}
