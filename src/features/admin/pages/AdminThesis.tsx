import { useState } from 'react';
import { Plus, Trash2, Eye, Pencil, Search } from 'lucide-react';
import { AdminTable, type Column } from '../components/AdminTable';
import { StatusBadge, AdminPostedBadge } from '../components/StatusBadge';
import { ConfirmModal } from '../components/AdminModal';
import { adminTheses, type AdminThesisItem } from '@/data/adminData';

export default function AdminThesis() {
    const [data, setData] = useState(adminTheses);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [deleteTarget, setDeleteTarget] = useState<AdminThesisItem | null>(null);

    const filtered = data.filter((t) => {
        if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.organization.toLowerCase().includes(search.toLowerCase())) return false;
        if (statusFilter !== 'all' && t.status !== statusFilter) return false;
        return true;
    });

    const columns: Column<AdminThesisItem>[] = [
        {
            key: 'title',
            label: 'Title',
            sortable: true,
            render: (row) => (
                <div className="max-w-[280px]">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{row.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{row.field}</p>
                </div>
            ),
        },
        { key: 'organization', label: 'Organization', sortable: true, render: (row) => <span className="text-sm text-slate-600 dark:text-slate-300">{row.organization}</span> },
        { key: 'location', label: 'Location', render: (row) => <span className="text-sm text-slate-500">{row.location}</span> },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-1.5">
                    <StatusBadge status={row.status} />
                    {row.createdBy === 'admin' && <AdminPostedBadge />}
                </div>
            ),
        },
        { key: 'applicants', label: 'Applicants', sortable: true, render: (row) => <span className="text-sm text-slate-600 dark:text-slate-300">{row.applicants}</span> },
        { key: 'createdAt', label: 'Created', sortable: true, render: (row) => <span className="text-xs text-slate-400">{row.createdAt}</span> },
        {
            key: 'actions',
            label: '',
            className: 'text-right',
            render: (row) => (
                <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-600 transition-colors">
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setDeleteTarget(row); }}
                        className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-400 hover:text-red-600 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50" style={{ fontFamily: 'var(--font-display)' }}>Thesis Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{data.length} total thesis projects</p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Create Thesis
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search thesis..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 transition-all"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 transition-all"
                >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="pending">Pending</option>
                    <option value="draft">Draft</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <AdminTable columns={columns} data={filtered} />

            <ConfirmModal
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={() => {
                    if (deleteTarget) setData((d) => d.filter((t) => t.id !== deleteTarget.id));
                }}
                title="Delete Thesis"
                description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
                confirmLabel="Delete"
                variant="danger"
            />
        </div>
    );
}
