import { useState } from 'react';
import { Check, X, Eye } from 'lucide-react';
import { AdminTable, type Column } from '../components/AdminTable';
import { StatusBadge } from '../components/StatusBadge';
import { adminTheses, adminInternships, type AdminThesisItem, type AdminInternshipItem } from '@/data/adminData';

const tabs = [
    { key: 'thesis', label: 'Pending Thesis' },
    { key: 'internships', label: 'Pending Internships' },
] as const;

export default function AdminApprovals() {
    const [tab, setTab] = useState<string>('thesis');
    const [theses, setTheses] = useState(adminTheses.filter(t => t.status === 'pending'));
    const [internships, setInternships] = useState(adminInternships.filter(i => i.status === 'pending'));

    const approveThesis = (id: string) => setTheses(t => t.map(x => x.id === id ? { ...x, status: 'published' as const } : x));
    const rejectThesis = (id: string) => setTheses(t => t.map(x => x.id === id ? { ...x, status: 'rejected' as const } : x));
    const approveInternship = (id: string) => setInternships(i => i.map(x => x.id === id ? { ...x, status: 'published' as const } : x));
    const rejectInternship = (id: string) => setInternships(i => i.map(x => x.id === id ? { ...x, status: 'rejected' as const } : x));

    const thesisColumns: Column<AdminThesisItem>[] = [
        {
            key: 'title', label: 'Title', sortable: true,
            render: (row) => (
                <div className="max-w-[300px]">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{row.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{row.field}</p>
                </div>
            ),
        },
        { key: 'organization', label: 'Organization', render: (row) => <span className="text-sm text-slate-600 dark:text-slate-300">{row.organization}</span> },
        { key: 'location', label: 'Location', render: (row) => <span className="text-sm text-slate-500">{row.location}</span> },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
        { key: 'createdAt', label: 'Submitted', render: (row) => <span className="text-xs text-slate-400">{row.createdAt}</span> },
        {
            key: 'actions', label: '', className: 'text-right',
            render: (row) => row.status === 'pending' ? (
                <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><Eye className="w-4 h-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); approveThesis(row.id); }} className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-slate-400 hover:text-emerald-600 transition-colors"><Check className="w-4 h-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); rejectThesis(row.id); }} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-400 hover:text-red-600 transition-colors"><X className="w-4 h-4" /></button>
                </div>
            ) : <StatusBadge status={row.status} />,
        },
    ];

    const internshipColumns: Column<AdminInternshipItem>[] = [
        {
            key: 'title', label: 'Title', sortable: true,
            render: (row) => (
                <div className="max-w-[300px]">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{row.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{row.field}</p>
                </div>
            ),
        },
        { key: 'company', label: 'Company', render: (row) => <span className="text-sm text-slate-600 dark:text-slate-300">{row.company}</span> },
        { key: 'location', label: 'Location', render: (row) => <span className="text-sm text-slate-500">{row.location}</span> },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
        { key: 'createdAt', label: 'Submitted', render: (row) => <span className="text-xs text-slate-400">{row.createdAt}</span> },
        {
            key: 'actions', label: '', className: 'text-right',
            render: (row) => row.status === 'pending' ? (
                <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><Eye className="w-4 h-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); approveInternship(row.id); }} className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-slate-400 hover:text-emerald-600 transition-colors"><Check className="w-4 h-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); rejectInternship(row.id); }} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-400 hover:text-red-600 transition-colors"><X className="w-4 h-4" /></button>
                </div>
            ) : <StatusBadge status={row.status} />,
        },
    ];

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50" style={{ fontFamily: 'var(--font-display)' }}>Approvals</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review and manage pending submissions</p>
            </div>

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

            {tab === 'thesis' ? (
                <AdminTable columns={thesisColumns} data={theses} emptyMessage="No pending thesis submissions" />
            ) : (
                <AdminTable columns={internshipColumns} data={internships} emptyMessage="No pending internship submissions" />
            )}
        </div>
    );
}
