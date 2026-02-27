import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AdminModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export function AdminModal({ open, onClose, title, children, maxWidth = 'max-w-md' }: AdminModalProps) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/40"
                        onClick={onClose}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className={`w-full ${maxWidth} bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden`}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                                <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            {/* Body */}
                            <div className="p-6">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmLabel?: string;
    variant?: 'danger' | 'default';
}

export function ConfirmModal({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm', variant = 'default' }: ConfirmModalProps) {
    return (
        <AdminModal open={open} onClose={onClose} title={title}>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{description}</p>
            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={() => { onConfirm(); onClose(); }}
                    className={`px-4 py-2 text-sm font-medium rounded-lg text-white transition-colors ${variant === 'danger'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
                        }`}
                >
                    {confirmLabel}
                </button>
            </div>
        </AdminModal>
    );
}
