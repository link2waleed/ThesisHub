import { useState } from 'react';
import { Trash2, Eye, Ban, Search } from 'lucide-react';
import { AdminTable, type Column } from '../components/AdminTable';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmModal } from '../components/AdminModal';
import { adminUsers, type AdminUser } from '@/data/adminData';

const tabs = [
    { key: 'all', label: 'All Users' },
    { key: 'student', label: 'Students' },
    { key: 'company', label: 'Companies' },
    { key: 'university', label: 'Universities' },
] as const;

export default function AdminUsers() {
    const [data, setData] = useState(adminUsers);
    const [tab, setTab] = useState<string>('all');
    const [search, setSearch] = useState('');
    const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
    const [suspendTarget, setSuspendTarget] = useState<AdminUser | null>(null);

    const filtered = data.filter((u) => {
        if (tab !== 'all' && u.role !== tab) return false;
        if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const columns: Column<AdminUser>[] = [
        {
            key: 'name',
            label: 'User',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                        {row.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{row.name}</p>
                        <p className="text-xs text-slate-400">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'role',
            label: 'Role',
            sortable: true,
            render: (row) => (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${row.role === 'student' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' :
                    row.role === 'company' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' :
                        'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400'
                    }`}>
                    {row.role}
                </span>
            ),
        },
        { key: 'organization', label: 'Organization', render: (row) => <span className="text-sm text-slate-500">{row.organization || '—'}</span> },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
        { key: 'registeredAt', label: 'Registered', sortable: true, render: (row) => <span className="text-xs text-slate-400">{row.registeredAt}</span> },
        {
            key: 'actions',
            label: '',
            className: 'text-right',
            render: (row) => (
                <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setSuspendTarget(row); }}
                        className="p-1.5 rounded-md hover:bg-amber-50 dark:hover:bg-amber-950/30 text-slate-400 hover:text-amber-600 transition-colors"
                    >
                        <Ban className="w-4 h-4" />
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
            <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50" style={{ fontFamily: 'var(--font-display)' }}>User Management</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{data.length} registered users</p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
                {tabs.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${tab === t.key
                            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 transition-all"
                />
            </div>

            <AdminTable columns={columns} data={filtered} />

            <ConfirmModal
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={() => {
                    if (deleteTarget) setData((d) => d.filter((u) => u.id !== deleteTarget.id));
                }}
                title="Delete User"
                description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
                confirmLabel="Delete"
                variant="danger"
            />

            <ConfirmModal
                open={!!suspendTarget}
                onClose={() => setSuspendTarget(null)}
                onConfirm={() => {
                    if (suspendTarget) {
                        setData((d) => d.map((u) => u.id === suspendTarget.id ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' } : u));
                    }
                }}
                title={suspendTarget?.status === 'suspended' ? 'Reactivate User' : 'Suspend User'}
                description={`Are you sure you want to ${suspendTarget?.status === 'suspended' ? 'reactivate' : 'suspend'} "${suspendTarget?.name}"?`}
                confirmLabel={suspendTarget?.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                variant={suspendTarget?.status === 'suspended' ? 'default' : 'danger'}
            />
        </div>
    );
}
