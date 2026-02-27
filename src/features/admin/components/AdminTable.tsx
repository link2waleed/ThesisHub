import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Column<T> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
    className?: string;
}

interface AdminTableProps<T> {
    columns: Column<T>[];
    data: T[];
    pageSize?: number;
    emptyMessage?: string;
    onRowClick?: (row: T) => void;
}

export function AdminTable<T extends { id: string }>({ columns, data, pageSize = 10, emptyMessage = 'No data found', onRowClick }: AdminTableProps<T>) {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);

    const sorted = useMemo(() => {
        if (!sortKey) return data;
        return [...data].sort((a, b) => {
            const va = (a as any)[sortKey];
            const vb = (b as any)[sortKey];
            if (typeof va === 'string') return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
            return sortDir === 'asc' ? va - vb : vb - va;
        });
    }, [data, sortKey, sortDir]);

    const totalPages = Math.ceil(sorted.length / pageSize);
    const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

    const toggleSort = (key: string) => {
        if (sortKey === key) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    if (data.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-12 text-center">
                <p className="text-sm text-slate-400">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap ${col.sortable ? 'cursor-pointer select-none hover:text-slate-700 dark:hover:text-slate-200' : ''} ${col.className || ''}`}
                                    onClick={() => col.sortable && toggleSort(col.key)}
                                >
                                    <span className="inline-flex items-center gap-1">
                                        {col.label}
                                        {col.sortable && sortKey === col.key && (
                                            sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paged.map((row) => (
                            <tr
                                key={row.id}
                                className={`border-b border-slate-50 dark:border-slate-800/50 last:border-b-0 transition-colors ${onRowClick ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/20'}`}
                                onClick={() => onRowClick?.(row)}
                            >
                                {columns.map((col) => (
                                    <td key={col.key} className={`px-4 py-3 whitespace-nowrap ${col.className || ''}`}>
                                        {col.render ? col.render(row) : (row as any)[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500">
                        Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage(Math.max(0, page - 1))}
                            disabled={page === 0}
                            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-500 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`w-8 h-8 rounded-md text-xs font-medium transition-colors ${page === i ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                            disabled={page === totalPages - 1}
                            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-500 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
